import pandas as pd
import numpy as np
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MultiLabelBinarizer, OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.svm import SVR, SVC
from xgboost import XGBRegressor, XGBClassifier
from sklearn.neighbors import KNeighborsRegressor, KNeighborsClassifier
from sklearn.ensemble import StackingRegressor, StackingClassifier
from sklearn.metrics import mean_squared_error, accuracy_score
from imblearn.over_sampling import SMOTE

# Base directory for saving models
MODELS_DIR = "models"
os.makedirs(MODELS_DIR, exist_ok=True)

def save_model_and_preprocessors(preprocessors, models, directory):
    os.makedirs(directory, exist_ok=True)
    for name, item in {**preprocessors, **models}.items():
        joblib.dump(item, os.path.join(directory, f"{name}.pkl"))

def preprocess_data(df):
    if 'Source' in df.columns:
        df = df.drop(columns=['Source']).copy()

    # Impute missing values
    numerical_cols = df.select_dtypes(include=np.number).columns.tolist()
    categorical_cols = df.select_dtypes(include='object').columns.tolist()

    imputer_num = SimpleImputer(strategy='mean')
    df[numerical_cols] = imputer_num.fit_transform(df[numerical_cols])

    imputer_cat = SimpleImputer(strategy='most_frequent')
    df[categorical_cols] = imputer_cat.fit_transform(df[categorical_cols])

    # Process list fields correctly
    df['Skills'] = df['Skills'].apply(lambda x: [i.strip() for i in str(x).split(',') if i.strip()])
    df['Certifications'] = df['Certifications'].apply(lambda x: [i.strip() for i in str(x).split(',') if i.strip()])
    df['NumSkills'] = df['Skills'].apply(len)
    df['NumCerts'] = df['Certifications'].apply(len)

    # Define preprocessors
    preprocessors = {
    'skills_encoder': MultiLabelBinarizer(),
    'certs_encoder': MultiLabelBinarizer(),
    'educ_encoder': OneHotEncoder(handle_unknown='ignore', sparse_output=False),
    'role_encoder': OneHotEncoder(handle_unknown='ignore', sparse_output=False),
    'scaler': StandardScaler()
    }


    # Fit encoders
    skills_encoded = preprocessors['skills_encoder'].fit_transform(df['Skills'])
    certs_encoded = preprocessors['certs_encoder'].fit_transform(df['Certifications'])

    educ_encoded = preprocessors['educ_encoder'].fit_transform(pd.DataFrame(df['Education'], columns=['Education']))
    role_encoded = preprocessors['role_encoder'].fit_transform(pd.DataFrame(df['Job Role'], columns=['Job Role']))

    num_features = df[['Experience (Years)', 'CGPA', 'NumSkills', 'NumCerts']]
    numeric_scaled = preprocessors['scaler'].fit_transform(num_features)

    # Stack all features
    X_transformed = np.hstack([skills_encoded, certs_encoded, educ_encoded, role_encoded, numeric_scaled])

    # Targets
    y_reg = df['Job Fit Score'].values
    y_class = pd.cut(y_reg, bins=[0, 60, 80, 100], labels=[0, 1, 2]).astype(int)

    return X_transformed, y_reg, y_class, preprocessors

def train_role_specific_models(role, df_role):
    X, y_reg, y_class, preprocessors = preprocess_data(df_role)

    smote = SMOTE(random_state=42)
    X_resampled, y_class_resampled = smote.fit_resample(X, y_class)

    resampled_indices = smote.fit_resample(np.arange(len(y_class)).reshape(-1, 1), y_class)[0].flatten()
    y_reg_resampled = y_reg[resampled_indices]

    X_train, X_test, y_train_reg, y_test_reg, y_train_class, y_test_class = train_test_split(
        X_resampled, y_reg_resampled, y_class_resampled, test_size=0.2, random_state=42
    )

    stacked_reg = StackingRegressor(
        estimators=[("svr", SVR()), ("xgb", XGBRegressor(random_state=42))],
        final_estimator=KNeighborsRegressor()
    )
    stacked_reg.fit(X_train, y_train_reg)
    mse = mean_squared_error(y_test_reg, stacked_reg.predict(X_test))
    print(f"Job Role: {role}\nRegression Model Test MSE: {mse:.4f}")

    stacked_clf = StackingClassifier(
        estimators=[("svc", SVC()), ("xgbc", XGBClassifier(random_state=42))],
        final_estimator=KNeighborsClassifier()
    )
    stacked_clf.fit(X_train, y_train_class)
    accuracy = accuracy_score(y_test_class, stacked_clf.predict(X_test))
    accuracy *= 100
    accuracy = round(accuracy, 2)
    print(f"Classification Model Test Accuracy: {accuracy}%")

    model_dir = os.path.join(MODELS_DIR, role)
    save_model_and_preprocessors(
        preprocessors,
        {'stacked_regressor': stacked_reg, 'stacked_classifier': stacked_clf},
        model_dir
    )

def process_all_roles(df):
    unique_roles = df['Job Role'].unique()
    for role in unique_roles:
        df_role = df[df['Job Role'] == role].copy()
        if len(df_role) < 10:
            print(f"Skipping {role} due to insufficient data.\n")
            continue
        train_role_specific_models(role, df_role)

# Load dataset
df = pd.read_excel("Dataset Final.xlsx")
process_all_roles(df)
