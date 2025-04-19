import logging
import json
import shutil
import PyPDF2
import os
import fitz
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import numpy as np
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from Processing.Resume.resume import ProcessResume
from Processing.Job_Description.jd import ProcessJD

resumeClass = ProcessResume()
jdClass = ProcessJD()

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

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app!"}

@app.post("/getMatchScore/")
async def process_frontend_request(pdf: UploadFile = File(...), job_description: str = Form(...)):
    """Handles file upload, extracts text, processes resume, and computes match score."""
    logger.info("Received file: %s", pdf.filename)
    
    try:

        pdf_content = await pdf.read()

        # Load the PDF document from the in-memory bytes
        pdf_document = fitz.open(stream=pdf_content, filetype="pdf")

        # Get the metadata
        metadata = pdf_document.metadata

        subject = metadata.get('subject', 'No subject available')

        os.makedirs("Input", exist_ok=True)
        input_directory = "Input/"

        with open(input_directory + f"{pdf.filename}", "wb") as pdf_file:
            shutil.copyfileobj(pdf.file, pdf_file)

        with open(input_directory + "Job Description.txt", "w") as text_file:
            text_file.write(job_description)

        """pdf_reader = PyPDF2.PdfReader(pdf.file)
        text = "".join([page.extract_text() for page in pdf_reader.pages if page.extract_text()])

        resume_output_directory = "Output/Resume/Text/"

        save_output_json("Extracted Text.json", {"resume_text": text}, "Output/Resume/Json")

        with open(resume_output_directory + "Extracted Text.txt", "w") as text_file:
            text_file.write(text)

        text = resumeClass.remove_resume_timestamp(text)
        text = resumeClass.normalize_resume_text(text)
        text = resumeClass.merge_broken_words(text)
        
        with open(resume_output_directory + "Cleaned Text.txt", "w") as text_file:
            text_file.write(text)

        save_output_json("Cleaned Text.json", {"resume_text": text}, "Output/Resume/Json")

        resume_entities = resumeClass.extract_resume(text)
        save_output_json("Entity List.json", resume_entities, "Output/Resume/Json")"""

        if(subject):
            resume_entities = resumeClass.split_resume_sections(subject)
            save_output_json("Entity List.json", resume_entities, "Output/Resume/Json")
        else:
            return JSONResponse(status_code=500, content={"error": "Upload AU Format Resume"})

        job_description_entities = jdClass.extract_jd(job_description)
        save_output_json("Entity List.json", job_description_entities, "Output/JD")

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

def compute_weighted_score(resume_entities, job_description_entities):
    """Computes weighted score using SBERT cosine similarity with size-matched embeddings."""
    weights = {"Skills": 0.45, "Experience": 0.2, "Education": 0.25, "Certifications": 0.05}
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
        (matched_entities if similarity > 0.10 else unmatched_entities)[key] = {
            "resume": resume_text,
            "job_description": jd_text,
            "similarity": f"{round(float(similarity*100), 2)}%"
        }

    final_score = round(float(total_score * 100), 2)
    return final_score, matched_entities, unmatched_entities


#uvicorn main:app --reload --port 8000