import re
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import spacy
import gensim.downloader as api
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict
from sentence_transformers import SentenceTransformer

nlp = spacy.load("en_core_web_sm")
word2vec = api.load("word2vec-google-news-300")  
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')


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
    return entities

def extract_jd_experience(text: str):
    """Extracts years of experience from the job description."""
    matches = re.findall(r"(\d+)\s*(?:years?|months?)", text, re.IGNORECASE)
    years = sum(int(m) / 12 if "month" in text.lower() else int(m) for m in matches) if matches else 0
    return round(years, 1)