import re
import json
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import logging
import shutil
import numpy as np
import spacy
import gensim.downloader as api
import PyPDF2
import nltk
from nltk.corpus import words
from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict

nlp = spacy.load("en_core_web_sm")
word2vec = api.load("word2vec-google-news-300")  
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

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

nltk_data_path = os.path.join(os.getcwd(), 'nltk_data')

if not os.path.exists(os.path.join(nltk_data_path, 'corpora', 'words.zip')):
    nltk.download('words', download_dir=nltk_data_path)

nltk.data.path.append(nltk_data_path)

valid_words = set(words.words())

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

        resume_output_directory = "Output/Resume/Text/"

        save_output_json("resume extracted text.json", {"resume_text": text}, "Output/Resume/Json")

        with open(resume_output_directory + "Extracted Text.txt", "w") as text_file:
            text_file.write(text)

        text = remove_resume_timestamp(text)
        text = normalize_resume_text(text)
        text = merge_broken_words(text)
        
        with open(resume_output_directory + "Cleaned Text.txt", "w") as text_file:
            text_file.write(text)

        save_output_json("resume cleaned text.json", {"resume_text": text}, "Output/Resume/Json")

        resume_entities = extract_resume(text)
        job_description_entities = extract_jd(job_description)

        match_score, matched_entities, unmatched_entities = compute_weighted_score(resume_entities, job_description_entities)

        save_output_json("Success Score.json", {
            "match_score": match_score,
            "matched_entities": matched_entities,
            "unmatched_entities": unmatched_entities
        }, "Output/Score")

        return {"match_score": f"{match_score}%", "matched_entities": matched_entities, "unmatched_entities": unmatched_entities}
    
    except Exception as e:
        logger.error("Error processing file: %s", str(e))
        return JSONResponse(status_code=500, content={"error": str(e)})

def compute_weighted_score(resume_entities, job_description_entities):
    """Computes weighted score using SBERT cosine similarity with size-matched embeddings."""
    weights = {"SKILLS": 0.45, "EXPERIENCE": 0.2, "EDUCATION": 0.25, "CERTIFICATIONS": 0.05}
    total_score = 0.0
    matched_entities = {}
    unmatched_entities = {}

    save_output_json("Resume Entity.json", resume_entities, "Output/Score")
    save_output_json("JD Entity.json", job_description_entities, "Output/Score")

    for key, weight in weights.items():
        resume_text = resume_entities.get(key, "None")
        jd_text = job_description_entities.get(key, "None")

        if isinstance(jd_text, list):
            jd_text = " ".join(jd_text) if jd_text else "None"

        embedding1 = model.encode(resume_text, normalize_embeddings=True)
        embedding2 = model.encode(jd_text, normalize_embeddings=True)

        if len(embedding2.shape) > 1:
            embedding2 = np.mean(embedding2, axis=0)  

        similarity = cosine_similarity([embedding1], [embedding2])[0][0] if embedding1.shape == embedding2.shape else 0.0

        if embedding1.shape != embedding2.shape:
            logger.error(f"Embedding size mismatch: {key} (Resume: {embedding1.shape}, JD: {embedding2.shape})")

        total_score += weight * similarity
        (matched_entities if similarity > 0.05 else unmatched_entities)[key] = {
            "resume": resume_text,
            "job_description": jd_text,
            "similarity": round(float(similarity), 4)
        }

    final_score = round(float(total_score * 100), 2)
    return final_score, matched_entities, unmatched_entities

def save_output_json(filename, data, debug_dir):
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
    text = text.replace("SUMMAR Y", "SUMMARY")
    text = text.replace("EXPERIENCE ", "EXPERIENCE")
    text = text.replace("EDUCA TION", "EDUCATION")
    text = text.replace("CERTIFICA TIONS", "CERTIFICATIONS")
    text = text.replace("LANGU AGE PR OFICIENCY", "LANGUAGE PROFICIENCY")
    return text.strip()

def is_meaningful_word(word):
    return word.lower() in valid_words

def merge_broken_words(paragraph):
    words_list = paragraph.split(" ")
    
    result = []
    
    i = 0
    while i < len(words_list) - 1:  
        left_word = words_list[i]
        right_word = words_list[i + 1]
        
        combined = left_word + right_word
        if is_meaningful_word(combined):
            result.append(combined)
            i += 2  
        else:
            result.append(left_word)
            i += 1
    
    if i < len(words_list):
        result.append(words_list[i])
    
    return " ".join(result) 

def extract_resume(text: str):
    """Extracts all relevant sections dynamically."""
    extracted_data = {}
    current_key = ""
    current_value = ""
    
    lines = text.split('\n')
    
    for line in lines:
        line = line.replace("\u00a0", "")
        
        if line.isupper():
            if current_key:  
                extracted_data[current_key] = current_value.strip()
            current_key = line
            current_value = ""
        else:
            current_value += line + "\n"
    
    if current_key:
        extracted_data[current_key] = current_value.strip()
    
    save_output_json("Entity List.json", extracted_data, "Output/Resume/Json")
    return extracted_data

# --- Job Description Entity Extraction Methods ---

TECH_SKILLS = {"Java", "Python", "JavaScript", "React", "Node.js", "Spring", "SQL", "AWS", "Docker", "Kubernetes"}

skill_queries = [
    "List all required technical and soft skills mentioned in the job description.",
    "Identify programming languages, frameworks, cloud platforms, and technologies required for this role.",
    "Extract soft skills like teamwork, problem-solving, and leadership from the job description."
]

education_queries = [
    "What academic qualifications are mentioned in the job description?",
    "Extract all references to degrees, fields of study, and university education.",
    "Identify preferred or required degrees such as Bachelor's, Master's, or Ph.D."
]

certification_queries = [
    "List all professional certifications explicitly mentioned in the job description.",
    "Identify cloud, security, and AI certifications required for this role.",
    "Extract any mention of industry-recognized certifications like AWS, Google Cloud, or CISSP."
]

STOPWORDS = {"the position", "candidates", "at least", "we are looking for", "the role", "preferred qualifications"}

skill_embeddings = model.encode(skill_queries)
education_embeddings = model.encode(education_queries)
certification_embeddings = model.encode(certification_queries)

def extract_key_phrases(sentence: str):
    """Extracts key phrases using NER and dependency parsing."""
    doc = nlp(sentence)
    key_phrases = set()

    for ent in doc.ents:
        key_phrases.add(ent.text)

    for chunk in doc.noun_chunks:
        key_phrases.add(chunk.text)

    for token in doc:
        if token.pos_ == "VERB" and token.dep_ in {"ROOT", "acl"}:
            phrase = " ".join([token.text] + [child.text for child in token.rights if child.pos_ in {"NOUN", "PROPN"}])
            key_phrases.add(phrase)

    return key_phrases

def get_best_category(sentence, category_queries, category_embeddings):
    """Finds the most relevant query for the sentence."""
    sentence_embedding = model.encode(sentence)
    similarities = cosine_similarity([sentence_embedding], category_embeddings)[0]
    best_match_idx = similarities.argmax()
    return similarities[best_match_idx], category_queries[best_match_idx]

def filter_stopwords(phrases):
    """Removes generic, non-informative phrases."""
    return {phrase for phrase in phrases if phrase.lower() not in STOPWORDS}

def refine_entities(entities):
    """Cleans up extracted entities by merging related terms and removing duplicates."""
    refined = defaultdict(set)

    for category, terms in entities.items():
        for term in terms:
            cleaned_term = term.lower().strip()
            if any(cleaned_term in existing for existing in refined[category]):
                continue  # Skip near-duplicates
            refined[category].add(cleaned_term)

    return {key: list(value) for key, value in refined.items()}

def extract_jd(text: str):
    """Extracts structured data from the job description using SBERT-based semantic classification."""
    doc = nlp(text)
    sentences = [sent.text for sent in doc.sents]

    skills, education, certifications = set(), set(), set()
    experience = extract_jd_experience(text)

    for sentence in sentences:
        skill_score, _ = get_best_category(sentence, skill_queries, skill_embeddings)
        education_score, _ = get_best_category(sentence, education_queries, education_embeddings)
        certification_score, _ = get_best_category(sentence, certification_queries, certification_embeddings)

        extracted_terms = extract_key_phrases(sentence)
        extracted_terms = filter_stopwords(extracted_terms)

        max_score = max(skill_score, education_score, certification_score)

        if max_score == skill_score:
            skills.update(extracted_terms)
        elif max_score == education_score:
            education.update(extracted_terms)
        elif max_score == certification_score:
            certifications.update(extracted_terms)

    entities = {
        "SKILLS": list(skills),
        "EXPERIENCE": str(experience),
        "EDUCATION": list(education),
        "CERTIFICATIONS": list(certifications),
    }

    entities = refine_entities(entities)

    save_output_json("Entity List.json", entities, "Output/JD")
    return entities

def extract_jd_experience(text: str):
    """Extracts years of experience from the job description."""
    matches = re.findall(r"(\d+)\s*(?:years?|months?)", text, re.IGNORECASE)
    years = sum(int(m) / 12 if "month" in text.lower() else int(m) for m in matches) if matches else 0
    save_output_json("Experience.json", {"matches": matches, "computed_years": years}, "Output/JD")
    return round(years, 1)

