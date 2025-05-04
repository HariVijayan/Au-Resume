import joblib
import pandas as pd
import os
import numpy as np

class JobFitPredictor:
    def __init__(self, model_directory="models"):
        self.model_directory = model_directory

    def load_models_and_preprocessors(self, job_role):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        job_role_model_dir = os.path.join(current_dir, self.model_directory, job_role)

        if not os.path.exists(job_role_model_dir):
            print(f"No models found for job role: {job_role}")
            return (f"No models found for job role: {job_role}")

        try:
            return {
                "skills_encoder": joblib.load(os.path.join(job_role_model_dir, "skills_encoder.pkl")),
                "certs_encoder": joblib.load(os.path.join(job_role_model_dir, "certs_encoder.pkl")),
                "educ_encoder": joblib.load(os.path.join(job_role_model_dir, "educ_encoder.pkl")),
                "role_encoder": joblib.load(os.path.join(job_role_model_dir, "role_encoder.pkl")),
                "scaler": joblib.load(os.path.join(job_role_model_dir, "scaler.pkl")),
                "regressor": joblib.load(os.path.join(job_role_model_dir, "stacked_regressor.pkl")),
                "classifier": joblib.load(os.path.join(job_role_model_dir, "stacked_classifier.pkl")),
            }
        except Exception as e:
            print(f"Error loading models for {job_role}: {e}")
            return {f"Error loading models for {job_role}: {e}"}

    def preprocess_input(self, data_dict, encoders):
        skills = [s.strip() for s in str(data_dict.get("Skills", "")).split(",") if s.strip()]
        certs = [c.strip() for c in str(data_dict.get("Certifications", "")).split(",") if c.strip()]
        educ = data_dict.get("Education", "")
        role = data_dict.get("Job Role", "")
        exp = float(data_dict.get("Experience (Years)", 0))
        cgpa = float(data_dict.get("CGPA", 0.0))

        num_skills = len(skills)
        num_certs = len(certs)

        skills = [s for s in skills if s in encoders["skills_encoder"].classes_]
        certs = [c for c in certs if c in encoders["certs_encoder"].classes_]

        skills_enc = encoders["skills_encoder"].transform([skills])
        certs_enc = encoders["certs_encoder"].transform([certs])

        educ_df = pd.DataFrame([[educ]], columns=["Education"])
        role_df = pd.DataFrame([[role]], columns=["Job Role"])
        educ_enc = encoders["educ_encoder"].transform(educ_df)
        role_enc = encoders["role_encoder"].transform(role_df)

        if hasattr(educ_enc, "toarray"):
            educ_enc = educ_enc.toarray()
        if hasattr(role_enc, "toarray"):
            role_enc = role_enc.toarray()

        numeric_df = pd.DataFrame([[exp, cgpa, num_skills, num_certs]], columns=["Experience (Years)", "CGPA", "NumSkills", "NumCerts"])
        numeric_scaled = encoders["scaler"].transform(numeric_df)

        return np.hstack([skills_enc, certs_enc, educ_enc, role_enc, numeric_scaled])



    def predict(self, data_dict, job_role):
        loaded = self.load_models_and_preprocessors(job_role)
        if not loaded:
            return {"error": f"No model found for job role: {job_role}"}

        X_input = self.preprocess_input(data_dict, loaded)
        if X_input is None:
            return {"error": "Input preprocessing failed."}

        regressor = loaded["regressor"]
        classifier = loaded["classifier"]

        try:
            job_fit_score = float(regressor.predict(X_input)[0])
            class_label = int(classifier.predict(X_input)[0])
        except Exception as e:
            return {"error": f"Prediction failed: {e}"}

        label_map = {
            2: "High Success Rate",
            1: "Moderate Success Rate",
            0: "Low Success Rate"
        }

        return {
            "job_fit_score": f"{round(job_fit_score, 2)}%",
            "label": label_map.get(class_label, "Unknown")
        }