import re
import os
import spacy
import gensim.downloader as api
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict
from sentence_transformers import SentenceTransformer
import logging # Added for better debugging if needed


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class ProcessJD:
    def __init__(self):
        logging.info("Initializing ProcessJD...")
        os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

        logging.info("Loading spaCy model (en_core_web_sm)...")
        self.nlp = spacy.load("en_core_web_sm")
        logging.info("Loading Sentence Transformer model (paraphrase-MiniLM-L6-v2)...")
        self.model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

        self.skill_queries = [
            "Detail all the technical competencies and practical abilities required for this position. This includes proficiency in specific programming languages (e.g., Python, Java, C++), web development frameworks (like React, Angular, Vue, Spring Boot), database management systems (SQL, NoSQL varieties), cloud computing platforms (such as AWS, Azure, Google Cloud), containerization and orchestration tools (Docker, Kubernetes), version control systems (Git), and operating systems (Linux, Windows).",
            "Identify the necessary hands-on experience with software development tools, data analysis techniques, machine learning libraries (like TensorFlow, PyTorch), specific hardware, networking protocols, or cybersecurity practices mentioned as crucial for performing the job duties.",
            "Extract requirements related to specific methodologies, development practices, or operational processes like Agile, Scrum, DevOps, CI/CD pipelines, testing strategies (unit testing, integration testing), or project management techniques mentioned as necessary for the role.",

            "Identify the essential soft skills and professional attributes sought in a candidate. Focus on aspects like effective communication (written and verbal), teamwork and collaboration within cross-functional teams, problem-solving capabilities, critical thinking, analytical skills, leadership qualities, adaptability, time management, attention to detail, and client-facing interaction skills.",
            "Describe the interpersonal abilities needed to succeed in this role, such as negotiation skills, mentoring junior team members, presenting technical information to non-technical audiences, or managing stakeholder expectations.",

            "Specify required language skills, such as fluency in English, Spanish, German, or other languages necessary for communication in the role."
        ]

        self.education_queries = [
            "Specify the required or preferred academic background, including the level of degree (e.g., Bachelor's, Master's, PhD, Associate's), the specific field of study (such as Computer Science, Information Technology, Engineering, Data Science, Mathematics, Statistics, Business Administration, or a related discipline), and any mention of university prestige or specific coursework.",
            "Extract all details concerning educational prerequisites. This includes minimum degree requirements, desired major or concentration, and GPA requirements if mentioned.",

            "Does the job description mention acceptable alternatives to formal degrees, such as equivalent practical work experience, relevant certifications substituting for a degree, vocational training, or specific bootcamps?",
            "Identify statements discussing academic qualifications, university education, degrees earned, or ongoing studies relevant to the position."
        ]

        self.certification_queries = [
            "List all professional certifications, industry credentials, licenses, or specific training qualifications explicitly stated as required, preferred, or advantageous for this position. Pay attention to certifications related to cloud platforms (AWS Certified Solutions Architect, Azure Fundamentals, Google Cloud Professional), cybersecurity (CISSP, CEH, CompTIA Security+), project management (PMP, PRINCE2, Certified ScrumMaster), Agile methodologies (CSM, SAFe), IT infrastructure (ITIL, CCNA), data science (TensorFlow Developer Certificate), or specific software platforms.",
            "Identify mentions of vendor-specific certifications (e.g., from Microsoft, Cisco, Oracle, Salesforce, SAP) or technology-specific credentials that would enhance a candidate's profile for this role.",

            "Extract any requirements or preferences related to holding industry-recognized certifications or completing specific professional development courses relevant to the job's domain.",
            "Are there mentions of ongoing certification requirements or the need to obtain specific credentials after joining the company?"
        ]

        self.STOPWORDS = {
            "the position", "candidates", "at least", "we are looking for", "the role",
            "preferred qualifications", "minimum qualifications", "responsibilities include",
            "requirements", "experience", "skills", "education", "degree", "qualification",
            "a plus", "nice to have", "bonus points", "strong understanding", "familiarity with",
            "knowledge of", "ability to", "excellent communication skills", "team player",
            "problem solving skills", "self motivated", "detail oriented", "required", "preferred",
            "responsibilities", "duties", "candidate", "company", "team", "job", "work", "client",
             "qualification", "background", "level", "role", "position", "ideal candidate", "etc",
             "such as", "e g", "including", "related field", "related discipline",

            "expertise", "years", "year", "include", "look for", "developer", "fluency", "english",
            "websites", "portals", "preference", "technologies", "technology", "services", "service",
            "solutions", "solution", "applications", "application", "systems", "system",
            "field", "area", "equivalent", "equivalent experience", "practical experience", "work experience",
            "communication", "communication skill", "interpersonal skill", "written and verbal",
            "verbal communication", "written communication", "problem solving", "analytical skills",
            "critical thinking", "time management", "attention to detail", "leadership qualities",
            "dynamic team", "cross functional teams", 
            "day", "month", "daily", "basis",

            "full stack developer", "software engineer", "senior software engineer", "data scientist",
            "project manager", "product manager", "engineer", "developer", "manager", "specialist",
            "architect", "lead", "consultant"
        }

        logging.info("Encoding SBERT queries...")
        self.skill_embeddings = self.model.encode(self.skill_queries)
        self.education_embeddings = self.model.encode(self.education_queries)
        self.certification_embeddings = self.model.encode(self.certification_queries)
        logging.info("SBERT queries encoded.")
        logging.info("ProcessJD Initialized Successfully.")


    def _clean_phrase(self, phrase):
        """Utility to clean and normalize a single phrase."""
        cleaned = phrase.lower().strip()
        cleaned = re.sub(r'[.,;:]+$', '', cleaned).strip()
        cleaned = re.sub(r'^(a|an|the)\s+', '', cleaned).strip()
        cleaned = re.sub(r'\s+(a|an|the)$', '', cleaned).strip()
        cleaned = cleaned.replace('bachelor s', "bachelor's")
        cleaned = cleaned.replace('master s', "master's")
        return cleaned

    def extract_key_phrases(self, sentence: str):
        """Extracts key phrases using NER, noun chunks, and attempts comma splitting."""
        doc = self.nlp(sentence)
        key_phrases = set()

        for ent in doc.ents:
            if ent.label_ in ["ORG", "PRODUCT", "GPE", "LANGUAGE", "WORK_OF_ART", "LAW", "NORP"]:
                 phrase = self._clean_phrase(ent.text)
                 if phrase: key_phrases.add(phrase)


        for chunk in doc.noun_chunks:
            parts = re.split(r'\s*,\s*(?:and\s+|or\s+)?', chunk.text)
            for part in parts:
                cleaned_part = self._clean_phrase(part)
                if cleaned_part and (len(cleaned_part) > 2 or cleaned_part.isupper()):
                    key_phrases.add(cleaned_part)
        return {phrase for phrase in key_phrases if len(phrase) > 1}


    def get_best_category(self, sentence, category_queries, category_embeddings):
        """Finds the highest similarity score for the sentence within a specific category."""
        if not sentence.strip():
            return 0.0
        try:
            sentence_embedding = self.model.encode(sentence)
            similarities = cosine_similarity([sentence_embedding], category_embeddings)[0]
            return similarities.max() 
        except Exception as e:
            logging.error(f"Error encoding sentence or calculating similarity: {sentence[:50]}... - {e}")
            return 0.0


    def filter_stopwords(self, phrases):
        """Removes generic, non-informative phrases based on the STOPWORDS set and length."""
        filtered = set()
        for phrase in phrases:
            cleaned_phrase = self._clean_phrase(phrase) 
            if (cleaned_phrase not in self.STOPWORDS and
                len(cleaned_phrase) > 2 and 
                len(cleaned_phrase.split()) < 6): 
                 words = cleaned_phrase.split()
                 if sum(1 for word in words if word in self.STOPWORDS) / len(words) < 0.6:
                     filtered.add(cleaned_phrase)
        return filtered

    def refine_entities(self, entities):
        """
        Cleans up extracted entities:
        - Splits comma-separated terms.
        - Removes stopwords again after potential splitting.
        - Removes duplicates across and within categories.
        - Removes shorter substrings if a longer, more specific term exists within the same category.
        """
        refined = defaultdict(set)
        processed_globally = set() 

        split_entities = defaultdict(set)
        for category, terms in entities.items():
            for term in terms:
                 parts = re.split(r'\s*,\s*(?:and\s+|or\s+)?', term)
                 for part in parts:
                     cleaned_part = self._clean_phrase(part)
                     if cleaned_part and cleaned_part not in self.STOPWORDS and len(cleaned_part) > 2:
                         split_entities[category].add(cleaned_part)

        all_categories_sorted_terms = []
        for category, terms in split_entities.items():
             all_categories_sorted_terms.extend([(term, category) for term in sorted(list(terms), key=len, reverse=True)])

        all_categories_sorted_terms.sort(key=lambda x: len(x[0]), reverse=True)

        category_specific_processed = defaultdict(set)

        for term, category in all_categories_sorted_terms:
            if term in processed_globally:
                continue

            is_substring_of_longer_in_cat = False
            for existing_term in category_specific_processed[category]:
                if re.search(r'\b' + re.escape(term) + r'\b', existing_term):
                    if len(existing_term) > len(term):
                      is_substring_of_longer_in_cat = True
                      break
            if is_substring_of_longer_in_cat:
                continue

            refined[category].add(term)
            category_specific_processed[category].add(term)
            processed_globally.add(term)
        return {key: sorted(list(value)) for key, value in refined.items()}

    def extract_jd_experience(self, text: str):
        """Extracts years of experience, trying to find the most relevant figure. Simplified output."""
        matches = re.findall(r'(\d+(?:\.\d+)?)\s*(?:year|month)s?\b(?=.{0,50}\b(?:experience|professional|industry)\b)', text, re.IGNORECASE)

        years_list = []
        processed_indices = set() 

        for match in re.finditer(r'(\d+(?:\.\d+)?)\s*(year|month)s?\b(?=.{0,50}\b(?:experience|professional|industry)\b)', text, re.IGNORECASE):
             start_index = match.start(1)
             if start_index in processed_indices:
                 continue

             num_str = match.group(1)
             unit = match.group(2).lower()
             try:
                 num = float(num_str)
                 if unit == 'month':
                     years_list.append(num / 12.0)
                 else:
                     years_list.append(num)
                 for i in range(match.start(1), match.end(1)):
                      processed_indices.add(i)
             except ValueError:
                 continue

        if not years_list:
             matches_plus = re.findall(r'(\d+(?:\.\d+)?)\+?\s*years?\+?', text, re.IGNORECASE)
             for m_str in matches_plus:
                 try:
                     years_list.append(float(m_str))
                 except ValueError:
                     continue

        if not years_list:
            return "Experience requirement not clearly specified" 

        max_years = max(years_list)
        return f"{round(max_years, 1)} years"


    def extract_jd(self, text: str):
        """Extracts data and generates more natural-sounding summaries for each category."""
        logging.info("Starting JD extraction with natural summary generation...")
        # Preprocess text
        text = re.sub(r'\s+', ' ', text).strip()
        doc = self.nlp(text)
        sentences = [sent.text.strip() for sent in doc.sents if len(sent.text.strip()) > 15]

        category_assignments = defaultdict(list)
        threshold = 0.35

        logging.info(f"Classifying {len(sentences)} sentences with threshold {threshold}...")
        for i, sentence in enumerate(sentences):
            skill_score = self.get_best_category(sentence, self.skill_queries, self.skill_embeddings)
            education_score = self.get_best_category(sentence, self.education_queries, self.education_embeddings)
            certification_score = self.get_best_category(sentence, self.certification_queries, self.certification_embeddings)
            language_score = self.get_best_category(sentence, ["Specify required language skills"], self.model.encode(["Specify required language skills"]))

            scores = {
                "Skills": skill_score,
                "Education": education_score,
                "Certifications": certification_score,
                "Language": language_score
            }

            best_category = max(scores, key=scores.get)
            max_score = scores[best_category]

            if max_score > threshold:
                category_assignments[best_category].append(sentence)

        logging.info("Extracting key phrases...")
        entities = defaultdict(set)
        for category, assigned_sentences in category_assignments.items():
            for sentence in assigned_sentences:
                extracted_terms = self.extract_key_phrases(sentence)
                filtered_terms = self.filter_stopwords(extracted_terms)
                entities[category].update(filtered_terms)

        logging.info("Refining entities...")
        refined_entities = self.refine_entities(entities)

        logging.info("Generating natural-sounding summaries...")
        final_output = {}
        post_processing_stopwords = {"skill", "education", "certification", "requirement", "qualification", "language"}

        if "Skills" in refined_entities and refined_entities["Skills"]:
            skill_keywords = [term for term in refined_entities["Skills"] if term not in post_processing_stopwords and not re.search(r'\d+\.?\d*\s*years?', term)]
            final_output["Skills"] = f"The ideal candidate should possess skills in {', '.join(skill_keywords)}." if skill_keywords else "No specific skills are explicitly mentioned."
        else:
            final_output["Skills"] = "No specific skills are explicitly mentioned."

        if "Education" in refined_entities and refined_entities["Education"]:
            degree_keywords = [term for term in refined_entities["Education"] if term not in post_processing_stopwords and ('bachelor' in term or 'master' in term or 'phd' in term or 'associate' in term)]
            field_keywords = [term for term in refined_entities["Education"] if term not in post_processing_stopwords and term not in degree_keywords]

            education_summary_parts = []
            if degree_keywords and field_keywords:
                final_output["Education"] = f"A {' or '.join(degree_keywords)} degree in {', '.join(field_keywords)} or a related area is preferred."
            elif degree_keywords:
                final_output["Education"] = f"A {' or '.join(degree_keywords)} degree is preferred."
            elif field_keywords:
                final_output["Education"] = f"Preferred educational background includes {', '.join(field_keywords)} or a similar field."
            else:
                final_output["Education"] = "No specific educational background is mentioned."
        else:
            final_output["Education"] = "No specific educational background is mentioned."

        if "Certifications" in refined_entities and refined_entities["Certifications"]:
            certification_list = [term for term in refined_entities["Certifications"] if term not in post_processing_stopwords and 'certifications' not in term]
            final_output["Certifications"] = f"Candidates with certifications such as {', '.join(certification_list)} will be favorably considered." if certification_list else "No specific certifications are highlighted."
        else:
            final_output["Certifications"] = "No specific certifications are highlighted."

        experience = self.extract_jd_experience(text)
        final_output["Experience"] = f"This role requires {experience} of prior experience." if experience != "Experience requirement not clearly specified" else "Prior experience requirements are not clearly specified."

        if "Language" in refined_entities and refined_entities["Language"]:
            language_list = [term for term in refined_entities["Language"] if term not in post_processing_stopwords and 'fluency' in term]
            final_output["Language"] = f"Fluency in {', '.join(language_list)} is required." if language_list else "No specific language proficiency is mentioned."
        else:
            final_output["Language"] = "No specific language proficiency is mentioned."

        logging.info("JD extraction and natural summary generation complete.")
        return dict(final_output)