import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC
from xgboost import XGBClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.compose import ColumnTransformer
import os
import numpy as np
from sklearn.preprocessing import LabelEncoder
from scipy import sparse
from sklearn.base import BaseEstimator, TransformerMixin

# Custom Transformer to append predictions
class PredictionAppender(BaseEstimator, TransformerMixin):
    def __init__(self, model):
        self.model = model

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        predictions = self.model.predict(X)
        return np.hstack((X, predictions.reshape(-1, 1)))

def preprocess_data(df):
    """Placeholder for your data preprocessing function."""
    # Replace this with your actual preprocessing steps
    # Example: Filling NaNs, lowercasing text, etc.
    df = df.fillna('')  # Example: Fill NaNs with empty strings
    return df

# Load Dataset
try:
    df = pd.read_excel("IT Final.xlsx")
except FileNotFoundError:
    print("Dataset file not found. Please check the path.")
    exit()

df = preprocess_data(df.copy())

# Drop columns that are not required for training
df = df.drop(columns=["Type", "Source"])

# Inspect Job Fit Score
print(f"Min Job Fit Score: {df['Job Fit Score'].min()}")
print(f"Max Job Fit Score: {df['Job Fit Score'].max()}")

# Corrected binning: Use percentiles or evenly spaced bins
bins = [40, 60, 80, 100]  # Example: Evenly spaced bins
labels = ["Low Fit", "Moderate Fit", "High Fit"]

try:
    df["Job Fit Category"] = pd.cut(
        df["Job Fit Score"],
        bins=bins,
        labels=labels,
        include_lowest=True
    )
except ValueError as e:
    print(f"Error during pd.cut: {e}")
    print("Problematic Job Fit Scores:", df[df["Job Fit Category"].isnull()]["Job Fit Score"].unique())
    exit()

# List of all unique job roles
job_roles = df["Job Role"].unique()

def create_preprocessor():
    preprocessor = ColumnTransformer(
        transformers=[
            ('skills', TfidfVectorizer(max_features=2000), 'Skills'),
            ('education', TfidfVectorizer(max_features=1000), 'Education'),
            ('certifications', TfidfVectorizer(max_features=1000), 'Certifications'),
            ('experience', StandardScaler(), ['Experience (Years)'])
        ],
        remainder='passthrough'
    )
    return preprocessor

for job_role in job_roles:
    job_role_df = df[df["Job Role"] == job_role].copy()
    X = job_role_df[["Skills", "Education", "Certifications", "Experience (Years)"]]
    y = job_role_df["Job Fit Category"]

    if X.shape[0] == 0:
        print(f"No data found for job role: {job_role}")
        continue

    preprocessor = create_preprocessor()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Label Encoding
    le = LabelEncoder()
    y_train = le.fit_transform(y_train)
    y_test = le.transform(y_test)

    X_train_transformed = preprocessor.fit_transform(X_train)
    X_test_transformed = preprocessor.transform(X_test)

    # Convert sparse matrices to dense arrays if needed
    if sparse.issparse(X_train_transformed):
        X_train_transformed = X_train_transformed.toarray()
    if sparse.issparse(X_test_transformed):
        X_test_transformed = X_test_transformed.toarray()

    if np.isnan(X_train_transformed).any() or np.isnan(X_test_transformed).any():
        print(f"NaNs found in transformed data for job role '{job_role}'.")
        print("X_train_transformed nans:", np.isnan(X_train_transformed).sum())
        print("X_test_transformed nans:", np.isnan(X_test_transformed).sum())
        print("Column names after transformation:", preprocessor.get_feature_names_out())
        continue

    print(f"Transformed training data shape for job role '{job_role}': {X_train_transformed.shape}")
    print(f"Transformed test data shape for job role '{job_role}': {X_test_transformed.shape}")
    print(f"y_train data type: {type(y_train)}")

    # Train LinearSVC
    svc_model = LinearSVC()
    svc_model.fit(X_train_transformed, y_train)

    # Append LinearSVC predictions to training data for XGBoost
    xgb_train_data = PredictionAppender(svc_model).transform(X_train_transformed)
    xgb_test_data = PredictionAppender(svc_model).transform(X_test_transformed)

    # Train XGBoost
    xgb_model = XGBClassifier()
    xgb_model.fit(xgb_train_data, y_train)

    # Append XGBoost predictions to training data for KNN
    knn_train_data = PredictionAppender(xgb_model).transform(xgb_train_data)
    knn_test_data = PredictionAppender(xgb_model).transform(xgb_test_data)

    # Train KNN
    knn_model = KNeighborsClassifier(n_neighbors=1)
    knn_model.fit(knn_train_data, y_train)

    job_role_model_dir = f"models/{job_role}"
    if not os.path.exists(job_role_model_dir):
        os.makedirs(job_role_model_dir)

    joblib.dump(svc_model, f"{job_role_model_dir}/svc_model.pkl")
    joblib.dump(xgb_model, f"{job_role_model_dir}/xgb_model.pkl")
    joblib.dump(knn_model, f"{job_role_model_dir}/knn_model.pkl")
    joblib.dump(preprocessor, f"{job_role_model_dir}/preprocessor.pkl")

    print(f"Models for job role '{job_role}' trained and saved successfully.")