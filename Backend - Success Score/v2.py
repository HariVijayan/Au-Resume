import re
import json
import os
import logging
import shutil
import numpy as np
import spacy
import gensim.downloader as api
import PyPDF2
from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Load NLP models
nlp = spacy.load("en_core_web_sm")
word2vec = api.load("word2vec-google-news-300")  # Google's pre-trained Word2Vec

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Predefined skills list
TECH_SKILLS = {"Java", "Python", "JavaScript", "React", "Node.js", "Spring", "SQL", "AWS", "Docker", "Kubernetes"}

# Define words/phrases to exclude from processing
EXCLUDED_PHRASES = {
    ""
}

# --- Helper Functions ---

def save_debug_output(filename, data):
    """Saves intermediate processing results to a JSON file for debugging."""
    debug_dir = "debug_outputs"
    os.makedirs(debug_dir, exist_ok=True)
    file_path = os.path.join(debug_dir, filename)

    # Convert NumPy types to native Python types before saving
    def convert_numpy(obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()  
        elif isinstance(obj, (np.float32, np.float64)):
            return float(obj)  
        elif isinstance(obj, (np.int32, np.int64)):
            return int(obj)  
        return obj

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, default=convert_numpy)


def remove_timestamp(text:str):
    pattern = r'\nDeveloped by the Department of IST. Generated at \s+\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2} Page\s*\d+ of \d+'
    updated_text = re.sub(pattern, '', text)
    return updated_text

def remove_excluded_phrases(text: str):
    """Removes all excluded phrases from the text before processing."""
    for phrase in EXCLUDED_PHRASES:
        text = text.replace(phrase, "")
    save_debug_output("cleaned_text.json", {"cleaned_resume_text": text})
    return text

def extract_experience(text: str):
    """Extracts years of experience from the resume."""
    matches = re.findall(r"(\d+)\s*(?:years?|months?)", text, re.IGNORECASE)
    years = sum(int(m) / 12 if "month" in text.lower() else int(m) for m in matches) if matches else 0
    save_debug_output("extract_experience.json", {"matches": matches, "computed_years": years})
    return round(years, 1)

def previous_method(text: str):
    """Extracts structured data using Named Entity Recognition (NER)."""
    doc = nlp(text)
    skills = set()
    experience = extract_experience(text)
    education = []
    certifications = []

    for ent in doc.ents:
        clean_text = ent.text.strip()

        if any(excluded in clean_text for excluded in EXCLUDED_PHRASES):
            continue
        
        if ent.label_ in ["ORG", "PRODUCT"] and clean_text in TECH_SKILLS:
            skills.add(clean_text)
        elif ent.label_ in ["EDUCATION", "DEGREE"]:
            education.append(clean_text)
        elif ent.label_ in ["CERTIFICATION", "AWARD"]:
            certifications.append(clean_text)

    entities = {
        "skills": list(skills),
        "experience": str(experience),
        "education": list(set(education)),
        "certifications": list(set(certifications)),
    }

    save_debug_output("extract_entities_ner.json", entities)
    return entities

def newer_method(text: str):
    """Extracts structured data using section-based parsing."""
    sections = {
        "summary": r"SUMMAR Y(.*?)EXPERIENCE",
        "experience": r"EXPERIENCE(.*?)EDUCA TION",
        "education": r"EDUCA TION(.*?)SKILLS",
        "skills": r"SKILLS(.*?)PROJECTS",
        "certifications": r"CERTIFICA TIONS(.*?)LANGU AGE PR OFICIENCY"
    }
    
    extracted_data = {}

    for key, pattern in sections.items():
        match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
        extracted_data[key] = match.group(1).strip() if match else "Not Found"

    save_debug_output("extract_entities_regex.json", extracted_data)
    return extracted_data

def compute_weighted_score(resume_entities, job_description_entities):
    """Computes weighted score with improved matching."""
    weights = {"skills": 0.5, "experience": 0.3, "education": 0.15, "certifications": 0.05}
    total_score = 0.0
    matched_entities = {}
    unmatched_entities = {}

    for key, weight in weights.items():
        similarity = 0.0
        if key == "experience":
            try:
                resume_exp = float(resume_entities["experience"]) if resume_entities["experience"] else 0.0
                job_exp = extract_experience(job_description_entities["experience"])
                similarity = 1.0 if resume_exp >= job_exp else resume_exp / job_exp if job_exp > 0 else 0.0
            except ValueError:
                resume_exp, job_exp = 0.0, 0.0  
        else:
            similarity = 1.0 if resume_entities[key] == job_description_entities[key] else 0.0

        total_score += weight * similarity
        (matched_entities if similarity > 0.5 else unmatched_entities)[key] = {
            "resume": resume_entities[key],
            "job_description": job_description_entities[key],
            "similarity": float(similarity)
        }

    final_score = round(float(total_score * 100), 2)
    save_debug_output("compute_weighted_score.json", {
        "final_score": final_score,
        "matched_entities": matched_entities,
        "unmatched_entities": unmatched_entities
    })

    return final_score, matched_entities, unmatched_entities

@app.post("/upload/")
async def upload_file(pdf: UploadFile = File(...), job_description: str = Form(...), method: str = Form("newer")):
    """Handles file upload, extracts text, processes resume, and computes match score."""
    logger.info("Received file: %s", pdf.filename)
    
    try:
        file_location = f"uploads/{pdf.filename}"
        os.makedirs("uploads", exist_ok=True)
        with open(file_location, "wb") as f:
            shutil.copyfileobj(pdf.file, f)

        with open(file_location, "rb") as f:
            pdf_reader = PyPDF2.PdfReader(f)
            text = "".join([page.extract_text() for page in pdf_reader.pages if page.extract_text()])

        save_debug_output("extracted_resume_text.json", {"resume_text": text})
        text = remove_timestamp(text)
        text = remove_excluded_phrases(text)

        resume_entities = newer_method(text) if method == "newer" else previous_method(text)
        job_description_entities = newer_method(job_description) if method == "newer" else previous_method(job_description)

        match_score, matched_entities, unmatched_entities = compute_weighted_score(resume_entities, job_description_entities)

        save_debug_output("final_output.json", {
            "match_score": match_score,
            "matched_entities": matched_entities,
            "unmatched_entities": unmatched_entities
        })

        return {"match_score": f"{match_score}%", "matched_entities": matched_entities, "unmatched_entities": unmatched_entities}
    
    except Exception as e:
        logger.error("Error processing file: %s", str(e))
        return JSONResponse(status_code=500, content={"error": str(e)})