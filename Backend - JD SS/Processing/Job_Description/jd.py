import re
import os
import spacy
import gensim.downloader as api
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict
from sentence_transformers import SentenceTransformer

class ProcessJD:
    def __init__(self):
        os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
        
        self.nlp = spacy.load("en_core_web_sm")
        
        self.word2vec = api.load("word2vec-google-news-300")  
        self.model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

        self.TECH_SKILLS = {"Java", "Python", "JavaScript", "React", "Node.js", "Spring", "SQL", "AWS", "Docker", "Kubernetes"}
        
        self.skill_queries = [
            "List all required technical and soft skills mentioned in the job description.",
            "Identify programming languages, frameworks, cloud platforms, and technologies required for this role.",
            "Extract soft skills like teamwork, problem-solving, and leadership from the job description."
        ]
        
        self.education_queries = [
            "What academic qualifications are mentioned in the job description?",
            "Extract all references to degrees, fields of study, and university education.",
            "Identify preferred or required degrees such as Bachelor's, Master's, or Ph.D."
        ]
        
        self.certification_queries = [
            "List all professional certifications explicitly mentioned in the job description.",
            "Identify cloud, security, and AI certifications required for this role.",
            "Extract any mention of industry-recognized certifications like AWS, Google Cloud, or CISSP."
        ]
        
        self.STOPWORDS = {"the position", "candidates", "at least", "we are looking for", "the role", "preferred qualifications"}

        self.skill_embeddings = self.model.encode(self.skill_queries)
        self.education_embeddings = self.model.encode(self.education_queries)
        self.certification_embeddings = self.model.encode(self.certification_queries)

    def extract_key_phrases(self, sentence: str):
        """Extracts key phrases using NER and dependency parsing."""
        doc = self.nlp(sentence)
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

    def get_best_category(self, sentence, category_queries, category_embeddings):
        """Finds the most relevant query for the sentence."""
        sentence_embedding = self.model.encode(sentence)
        similarities = cosine_similarity([sentence_embedding], category_embeddings)[0]
        best_match_idx = similarities.argmax()
        return similarities[best_match_idx], category_queries[best_match_idx]

    def filter_stopwords(self, phrases):
        """Removes generic, non-informative phrases."""
        return {phrase for phrase in phrases if phrase.lower() not in self.STOPWORDS}

    def refine_entities(self, entities):
        """Cleans up extracted entities by merging related terms and removing duplicates."""
        refined = defaultdict(set)

        for category, terms in entities.items():
            for term in terms:
                cleaned_term = term.lower().strip()
                if any(cleaned_term in existing for existing in refined[category]):
                    continue  
                refined[category].add(cleaned_term)

        return {key: list(value) for key, value in refined.items()}

    def extract_jd_experience(self, text: str):
        """Extracts years of experience from the job description."""
        matches = re.findall(r"(\d+(?:\.\d+)?)\s*(?:years?|months?)", text, re.IGNORECASE)
        years = sum(float(m) / 12 if "month" in text.lower() else float(m) for m in matches) if matches else 0
        return f"{round(years, 2)} years of experience" if years else "0 years of experience"

    def extract_jd(self, text: str):
        """Extracts structured data from the job description using SBERT-based semantic classification."""
        doc = self.nlp(text)
        sentences = [sent.text for sent in doc.sents]

        skills, education, certifications = set(), set(), set()
        experience = self.extract_jd_experience(text)

        for sentence in sentences:
            skill_score, _ = self.get_best_category(sentence, self.skill_queries, self.skill_embeddings)
            education_score, _ = self.get_best_category(sentence, self.education_queries, self.education_embeddings)
            certification_score, _ = self.get_best_category(sentence, self.certification_queries, self.certification_embeddings)

            extracted_terms = self.extract_key_phrases(sentence)
            extracted_terms = self.filter_stopwords(extracted_terms)

            max_score = max(skill_score, education_score, certification_score)

            if max_score == skill_score:
                skills.update(extracted_terms)
            elif max_score == education_score:
                education.update(extracted_terms)
            elif max_score == certification_score:
                certifications.update(extracted_terms)

        entities = {
            "Skills": list(skills),
            "Education": list(education),
            "Certifications": list(certifications),
        }

        entities = self.refine_entities(entities)
        entities["Experience"] = str(experience)
        return entities
