from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

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
    entity_string = ' '.join(entities)

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
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


#uvicorn app:app --reload --port 8000
