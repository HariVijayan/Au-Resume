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

@app.post("/getMatchScore/")
async def process_frontend_request(pdf: UploadFile = File(...), job_description: str = Form(...)):
    """Handles file upload, extracts text, processes resume, and computes match score."""
    logger.info("Received file: %s", pdf.filename)
    
    try:
        os.makedirs("Input", exist_ok=True)
        input_directory = "Input/"

        with open(input_directory + f"{pdf.filename}", "wb") as pdf_file:
            shutil.copyfileobj(pdf.file, pdf_file)

        with open(input_directory + "Job Description.txt", "w") as text_file:
            text_file.write(job_description)

        pdf_reader = PyPDF2.PdfReader(pdf.file)
        text = "".join([page.extract_text() for page in pdf_reader.pages if page.extract_text()])

        resume_output_directory = "Output/Resume/"

        with open(resume_output_directory + "Extracted Text.txt", "w") as text_file:
            text_file.write(text)

        text = remove_resume_timestamp(text)
        text = normalize_resume_text(text)
        
        with open(resume_output_directory + "Cleaned Text.txt", "w") as text_file:
            text_file.write(text)

        resume_entities = extract_resume(text)
        job_description_entities = extract_jd(job_description)

        match_score, matched_entities, unmatched_entities = compute_weighted_score(resume_entities, job_description_entities)

        save_debug_output("Success Score.json", {
            "match_score": match_score,
            "matched_entities": matched_entities,
            "unmatched_entities": unmatched_entities
        }, "Output")

        return {"match_score": f"{match_score}%", "matched_entities": matched_entities, "unmatched_entities": unmatched_entities}
    
    except Exception as e:
        logger.error("Error processing file: %s", str(e))
        return JSONResponse(status_code=500, content={"error": str(e)})

def save_debug_output(filename, data, debug_dir):
    """Saves intermediate processing results to a JSON file for debugging."""
    os.makedirs(debug_dir, exist_ok=True)
    file_path = os.path.join(debug_dir, filename)

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

# --- Resume Entity Extraction Methods ---        

def remove_resume_timestamp(text: str):
    """Removes timestamp and page numbers from the extracted text."""
    pattern = r"Developed by the Department of IST\. Generated at \d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2} Page \d+ of \d+"
    return re.sub(pattern, '', text).strip()

def normalize_resume_text(text: str):
    """Cleans up extracted text by fixing spacing issues and removing unnecessary sections."""
    text = re.sub(r'\s+', ' ', text)
    text = text.replace("SUMMAR Y", "SUMMARY")
    text = text.replace("EXPERIENCE ", "EXPERIENCE")
    text = text.replace("EDUCA TION", "EDUCATION")
    text = text.replace("CERTIFICA TIONS", "CERTIFICATIONS")
    text = text.replace("LANGU AGE PR OFICIENCY", "LANGUAGE PROFICIENCY")
    return text.strip()

def extract_resume_section(text: str, section_name: str, next_section_names: list):
    """Extracts text for a given section dynamically until the next uppercase header."""
    start_index = text.find(section_name)
    if start_index == -1:
        return "Not Found"
    
    end_index = len(text)
    for next_section in next_section_names:
        next_start = text.find(next_section, start_index + len(section_name))
        if next_start != -1:
            end_index = next_start
            break
            
    section_text = text[start_index + len(section_name):end_index].strip()
    return section_text

def extract_resume(text: str):
    """Extracts all relevant sections dynamically."""
    sections = ["SUMMARY", "EXPERIENCE", "EDUCATION", "SKILLS", "PROJECTS", "CERTIFICATIONS", "LANGUAGE PROFICIENCY"]
    extracted_data = {}
    
    for i, section in enumerate(sections):
        next_sections = sections[i + 1:]
        extracted_data[section.lower()] = extract_resume_section(text, section, next_sections)
    
    save_debug_output("Entity List.json", extracted_data, "Output/Resume")
    return extracted_data

def compute_weighted_score(resume_entities, job_description_entities):
    """Computes weighted score with improved matching."""
    weights = {"skills": 0.5, "experience": 0.3, "education": 0.15, "certifications": 0.05}
    total_score = 0.0
    matched_entities = {}
    unmatched_entities = {}

    for key, weight in weights.items():
        similarity = 1.0 if resume_entities[key] == job_description_entities[key] else 0.0
        total_score += weight * similarity
        (matched_entities if similarity > 0.5 else unmatched_entities)[key] = {
            "resume": resume_entities[key],
            "job_description": job_description_entities[key],
            "similarity": float(similarity)
        }

    final_score = round(float(total_score * 100), 2)

    return final_score, matched_entities, unmatched_entities

# --- Job Description Entity Extraction Methods ---

TECH_SKILLS = {"Java", "Python", "JavaScript", "React", "Node.js", "Spring", "SQL", "AWS", "Docker", "Kubernetes"}

def extract_jd(text: str):
    """Extracts structured data using Named Entity Recognition (NER)."""
    doc = nlp(text)
    skills = set()
    experience = extract_jd_experience(text)
    education = []
    certifications = []

    for ent in doc.ents:
        clean_text = ent.text.strip()
        
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

    save_debug_output("Entity List.json", entities, "Output/JD")
    return entities

def extract_jd_experience(text: str):
    matches = re.findall(r"(\d+)\s*(?:years?|months?)", text, re.IGNORECASE)
    years = sum(int(m) / 12 if "month" in text.lower() else int(m) for m in matches) if matches else 0
    save_debug_output("Experience.json", {"matches": matches, "computed_years": years}, "Output/JD")
    return round(years, 1)
