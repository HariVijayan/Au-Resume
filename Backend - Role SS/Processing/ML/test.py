import joblib
import pandas as pd
import os
from scipy import sparse
import numpy as np

class JobFitPredictor:

    def __init__(self, model_directory="models"):
        self.model_directory = model_directory

    def load_model_and_preprocessor(self, job_role):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        job_role_model_dir = os.path.join(current_dir, self.model_directory, job_role)

        if not os.path.exists(job_role_model_dir):
            print(f"No models found for job role: {job_role}")
            return None, None, None, None

        svc_model = joblib.load(os.path.join(job_role_model_dir, "svc_model.pkl"))
        xgb_model = joblib.load(os.path.join(job_role_model_dir, "xgb_model.pkl"))
        knn_model = joblib.load(os.path.join(job_role_model_dir, "knn_model.pkl"))
        preprocessor = joblib.load(os.path.join(job_role_model_dir, "preprocessor.pkl"))

        return svc_model, xgb_model, knn_model, preprocessor

    def predict_job_fit_stacked(self, resume, job_role):
        svc_model, xgb_model, knn_model, preprocessor = self.load_model_and_preprocessor(job_role)

        if svc_model is None:
            return None  

        resume_df = pd.DataFrame([resume])

        resume_transformed = preprocessor.transform(resume_df)

        if sparse.issparse(resume_transformed):
            resume_transformed = resume_transformed.toarray()

        svc_prediction = svc_model.predict(resume_transformed)

        xgb_input = np.hstack((resume_transformed, svc_prediction.reshape(-1, 1)))

        xgb_prediction = xgb_model.predict(xgb_input)

        knn_input = np.hstack((xgb_input, xgb_prediction.reshape(-1, 1)))
        knn_prediction = knn_model.predict(knn_input)

        if knn_prediction == 2:
            return "High Success Rate"
        elif knn_prediction == 1:
            return "Moderate Success Rate"
        else:
            return "Low Success Rate"

"""# Example usage for predicting job fit with stacked model
resume_example = {
    "Skills": "Python, Data Analysis, SQL",
    "Education": "M.Sc Data Science",
    "Certifications": "TensorFlow Developer Certificate",
    "Experience (Years)": 5
}

job_role_example = "Data Scientist"

predictor = JobFitPredictor()
final_prediction = predictor.predict_job_fit_stacked(resume_example, job_role_example)

if final_prediction is not None:
    print(f"Final Predicted Job Fit (Stacked) for '{job_role_example}': {final_prediction}")"""