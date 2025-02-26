from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import spacy
import gensim.downloader as api
import numpy as np
import PyPDF2
import os
import logging
import shutil
import re
import json

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

# Predefined skills list (expandable)
TECH_SKILLS = {"Java", "Python", "JavaScript", "React", "Node.js", "Spring", "SQL", "AWS", "Docker", "Kubernetes"}

# --- Helper Functions ---

def save_debug_output(filename, data):
    """Saves intermediate processing results to a JSON file for debugging."""
    debug_dir = "debug_outputs"
    os.makedirs(debug_dir, exist_ok=True)
    file_path = os.path.join(debug_dir, filename)

    # Convert NumPy types to native Python types before saving
    def convert_numpy(obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()  # Convert NumPy array to list
        elif isinstance(obj, np.float32) or isinstance(obj, np.float64):
            return float(obj)  # Convert float32/64 to Python float
        elif isinstance(obj, np.int32) or isinstance(obj, np.int64):
            return int(obj)  # Convert int32/64 to Python int
        return obj

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, default=convert_numpy)


def extract_experience(text: str):
    """Extracts years of experience from the resume and logs intermediate results."""
    matches = re.findall(r"(\d+)\s*(?:years?|months?)", text, re.IGNORECASE)
    if matches:
        years = sum(int(m) / 12 if "month" in text.lower() else int(m) for m in matches)
    else:
        years = 0

    # Save debug output
    save_debug_output("extract_experience.json", {"matches": matches, "computed_years": years})
    return round(years, 1)

# Define a set of words/phrases to exclude from extracted entities
EXCLUDED_PHRASES = {"Developed by the Department of IST.", "Generated at", "Page"}

def extract_entities(text: str):
    """ Extracts structured data from a resume while filtering out unwanted words/phrases. """
    doc = nlp(text)
    skills = set()
    experience = extract_experience(text)
    education = []
    certifications = []

    for ent in doc.ents:
        clean_text = ent.text.strip()

        # Check if the text matches or contains an excluded phrase
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

    # Save debug output
    save_debug_output("extract_entities.json", entities)
    return entities


def word2vec_similarity(word_list1, word_list2, category):
    """ Computes similarity using Word2Vec embeddings and logs results. """
    if not word_list1 or not word_list2:
        save_debug_output(f"word2vec_{category}.json", {"similarity": 0.0, "reason": "One or both lists are empty."})
        return 0.0  

    valid_words1 = [word for word in word_list1 if word in word2vec]
    valid_words2 = [word for word in word_list2 if word in word2vec]

    if not valid_words1 or not valid_words2:
        save_debug_output(f"word2vec_{category}.json", {"similarity": 0.0, "reason": "No valid words found in Word2Vec model."})
        return 0.0  

    similarities = [
        word2vec.similarity(w1, w2)
        for w1 in valid_words1
        for w2 in valid_words2
    ]

    similarity_score = np.mean(similarities) if similarities else 0.0
    save_debug_output(f"word2vec_{category}.json", {"similarity": similarity_score, "valid_words1": valid_words1, "valid_words2": valid_words2})
    
    return similarity_score

def compute_weighted_score(resume_entities, job_description_entities):
    """ Computes weighted score with improved matching and logs intermediate results. """
    base_weights = {"skills": 0.5, "experience": 0.3, "education": 0.15, "certifications": 0.05}
    weights = base_weights.copy()

    if not job_description_entities["experience"]:
        remaining_weight = 1.0 - base_weights["experience"]
        total_remaining_weight = sum([base_weights[key] for key in base_weights if key != "experience"])
        
        # Distribute experience weight proportionally among other weights
        for key in weights:
            if key != "experience":
                weights[key] = base_weights[key] + (base_weights[key] / total_remaining_weight) * base_weights["experience"]
        weights["experience"] = 0.0

    total_score = 0.0
    matched_entities = {}
    unmatched_entities = {}

    for key, weight in weights.items():
        if key == "experience":  
            try:
                resume_exp = float(resume_entities["experience"]) if resume_entities["experience"] else 0.0
                job_exp = extract_experience(job_description_entities["experience"])
            except ValueError:
                resume_exp, job_exp = 0.0, 0.0  

            similarity = 1.0 if resume_exp >= job_exp else resume_exp / job_exp if job_exp > 0 else 0.0
        else:
            similarity = word2vec_similarity(resume_entities[key], job_description_entities[key], key)

        total_score += weight * similarity

        # Classify entities as matched or unmatched
        if similarity > 0.5:
            matched_entities[key] = {
                "resume": resume_entities[key],
                "job_description": job_description_entities[key],
                "similarity": float(similarity)
            }
        else:
            unmatched_entities[key] = {
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
async def upload_file(pdf: UploadFile = File(...), job_description: str = Form(...)):
    """ Handles file upload, extracts text, processes resume, and computes match score. """
    logger.info("Received file: %s", pdf.filename)
    
    try:
        # Save file
        file_location = f"uploads/{pdf.filename}"
        os.makedirs("uploads", exist_ok=True)
        with open(file_location, "wb") as f:
            shutil.copyfileobj(pdf.file, f)

        # Extract text from PDF
        with open(file_location, "rb") as f:
            pdf_reader = PyPDF2.PdfReader(f)
            text = "".join([page.extract_text() for page in pdf_reader.pages if page.extract_text()])

        # Save raw extracted text for debugging
        save_debug_output("extracted_resume_text.json", {"resume_text": text})

        # Process extracted resume text
        resume_entities = extract_entities(text)
        job_description_entities = extract_entities(job_description)

        # Compute match score
        match_score, matched_entities, unmatched_entities = compute_weighted_score(resume_entities, job_description_entities)

        # Save final response output
        save_debug_output("final_output.json", {
            "match_score": match_score,
            "matched_entities": matched_entities,
            "unmatched_entities": unmatched_entities
        })

        return {
            "match_score": f"{match_score}%",
            "matched_entities": matched_entities,
            "unmatched_entities": unmatched_entities,
        }
    
    except Exception as e:
        logger.error("Error processing file: %s", str(e))
        return JSONResponse(status_code=500, content={"error": str(e)})
