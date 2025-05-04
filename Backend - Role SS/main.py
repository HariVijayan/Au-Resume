import logging
import json
import shutil
import PyPDF2
import fitz
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import numpy as np
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from Processing.Resume.resume import ProcessResume
from Processing.ML.test import JobFitPredictor

jobSSClass = JobFitPredictor()

resumeClass = ProcessResume()

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

@app.post("/getMatchScoreRole/")
async def process_frontend_request(pdf: UploadFile = File(...), job_role: str = Form(...)):
    """Handles file upload, extracts text, processes resume, and computes match score."""
    logger.info("Received file: %s", pdf.filename)
    
    try:
        pdf_content = await pdf.read()

        pdf_document = fitz.open(stream=pdf_content, filetype="pdf")

        metadata = pdf_document.metadata

        subject = metadata.get('subject', 'No subject available')

        if(subject):
            resume_entities = resumeClass.split_resume_sections(subject)
            save_output_json("Entity List.json", resume_entities, "Output/Resume/Json")
        else:
            return JSONResponse(status_code=400, content={"message": "The Role Fit Check module works only with the resumes created from this site."})

        os.makedirs("Input", exist_ok=True)
        input_directory = "Input/"

        with open(input_directory + f"{pdf.filename}", "wb") as pdf_file:
            shutil.copyfileobj(pdf.file, pdf_file)

        with open(input_directory + "Job Role.txt", "w") as text_file:
            text_file.write(job_role)

        """pdf_reader = PyPDF2.PdfReader(pdf.file)
        text = "".join([page.extract_text() for page in pdf_reader.pages if page.extract_text()])

        resume_output_directory = "Output/Text/"

        save_output_json("Extracted Text.json", {"resume_text": text}, "Output/Json")

        with open(resume_output_directory + "Extracted Text.txt", "w") as text_file:
            text_file.write(text)

        text = resumeClass.remove_resume_timestamp(text)
        text = resumeClass.normalize_resume_text(text)
        text = resumeClass.merge_broken_words(text)
        
        with open(resume_output_directory + "Cleaned Text.txt", "w") as text_file:
            text_file.write(text)

        save_output_json("Cleaned Text.json", {"resume_text": text}, "Output/Json")

        resume_entities = resumeClass.extract_resume(text)
        save_output_json("Entity List.json", resume_entities, "Output/Json")"""

        result = jobSSClass.predict(resume_entities, job_role)

        return {"success_score": result.get("label"), "job_fit_score": result.get("job_fit_score")}
        
    
    except Exception as e:
        logger.error("Error processing file: %s", str(e))
        return JSONResponse(status_code=500, content={"message": "Internal Server error. Processing failed."})
    
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
