from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from fastapi import File, UploadFile
from fastapi.responses import JSONResponse
import PyPDF2
import os
import logging
import shutil

from fastapi.middleware.cors import CORSMiddleware
nlp = spacy.load("en_core_web_sm")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

class InputData(BaseModel):
    document: str
    query_string: str

def extract_entities(document: str):
    doc = nlp(document)
    entities = [ent.text for ent in doc.ents]
    return entities

def compute_cosine_similarity(entities: list, query_string: str):
    if not query_string.strip():
        raise ValueError("Query string is empty")

    entity_string = ' '.join(entities)
    if not entity_string.strip():
        raise ValueError("Entity string is empty")

    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([entity_string, query_string])

    cosine_sim = cosine_similarity(vectors[0], vectors[1])
    return cosine_sim[0][0]
 

@app.post("/calculate_similarity/")
async def calculate_similarity(data: InputData):
    try:
        entities = extract_entities(data.document)

        if not entities:
            raise HTTPException(status_code=400, detail="No named entities found in the document.")
        
        cosine_sim = compute_cosine_similarity(entities, data.query_string)
        
        similarity_percentage = round(cosine_sim * 100, 2)
        return {"similarity_percentage": f"{similarity_percentage}%"}

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


@app.post("/upload/")
async def upload_file(pdf: UploadFile = File(...)):
    logger.info("Received file for upload: %s", pdf.filename)
    
    try:
        # Save the file to disk
        file_location = f"uploads/{pdf.filename}"
        logger.info("Saving file to location: %s", file_location)
        
        with open(file_location, "wb") as f:
            shutil.copyfileobj(pdf.file, f)

        logger.info("File saved successfully.")
        
        # Extract text from the PDF
        logger.info("Extracting text from the PDF.")
        with open(file_location, 'rb') as f:
            pdf_reader = PyPDF2.PdfReader(f)
            text = ''
            for page_num, page in enumerate(pdf_reader.pages):
                logger.debug("Extracting text from page %d", page_num)
                text += page.extract_text()

        logger.info("Text extraction completed.")
        
        # Example search methods
        search_term = "important"  # You can change this term dynamically as needed
        if search_term in text:
            logger.info("Found '%s' in the extracted text.", search_term)
        else:
            logger.info("'%s' not found in the extracted text.", search_term)

        word_count = text.count(search_term)
        logger.info("The term '%s' appears %d times.", search_term, word_count)

        # Example: Check if the text starts with a specific string
        if text.startswith("This is the"):
            logger.info("The extracted text starts with 'This is the'")

        # Return the extracted text along with search results
        return {"text": text, "search_results": f"Found '{search_term}' {word_count} times."}
    
    except Exception as e:
        logger.error("Error occurred: %s", str(e))
        return JSONResponse(status_code=500, content={"error": str(e)})




if __name__ == "__main__":
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


#uvicorn app:app --reload --port 8000
