import nltk
import os
import re
from nltk.corpus import words

class ProcessResume:
    def __init__(self, nltk_data_path=None):
        self.nltk_data_path = nltk_data_path or os.path.join(os.getcwd(), 'nltk_data')
        
        if not os.path.exists(os.path.join(self.nltk_data_path, 'corpora', 'words.zip')):
            nltk.download('words', download_dir=self.nltk_data_path)
        
        nltk.data.path.append(self.nltk_data_path)
        
        self.valid_words = set(words.words())
        
        os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

    def remove_resume_timestamp(self, text: str):
        """Removes timestamp and page numbers from the extracted text."""
        pattern = r"Developed by the Department of IST\. Generated at \d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2} Page \d+ of \d+"
        return re.sub(pattern, '', text).strip()

    def normalize_resume_text(self, text: str):
        """Cleans up extracted text by fixing spacing issues and removing unnecessary sections."""
        text = text.replace("SUMMAR Y", "SUMMARY")
        text = text.replace("EXPERIENCE ", "EXPERIENCE")
        text = text.replace("EDUCA TION", "EDUCATION")
        text = text.replace("CERTIFICA TIONS", "CERTIFICATIONS")
        text = text.replace("LANGU AGE PR OFICIENCY", "LANGUAGE PROFICIENCY")
        return text.strip()

    def is_meaningful_word(self, word):
        """Checks if the word is meaningful by verifying if it's in the dictionary."""
        return word.lower() in self.valid_words

    def merge_broken_words(self, paragraph):
        """Merges broken words in a paragraph."""
        words_list = paragraph.split(" ")
        
        result = []
        
        i = 0
        while i < len(words_list) - 1:
            left_word = words_list[i]
            right_word = words_list[i + 1]
            
            combined = left_word + right_word
            if self.is_meaningful_word(combined):
                result.append(combined)
                i += 2
            else:
                result.append(left_word)
                i += 1
        
        if i < len(words_list):
            result.append(words_list[i])
        
        return " ".join(result) 

    def extract_resume(self, text: str):
        """Extracts all relevant sections dynamically from the resume text."""
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
        
        for key, value in extracted_data.items():
            new_value = value.replace("\n", " ")
            extracted_data[key] = new_value

        extracted_data['Skills'] = extracted_data.pop("SKILLS")
        extracted_data['Certifications'] = extracted_data.pop("CERTIFICATIONS")
        extracted_data['Education'] = extracted_data.pop("EDUCATION")
        extracted_data['Experience (Years)'] = extracted_data.pop("EXPERIENCE")

        extracted_data['Experience (Years)'] = 3
        return extracted_data

    def split_resume_sections(self, resume_metadata: str):

        parts = re.split(r"(===\s*(?:Education|Experience|Skills|Certifications)\s*===)", resume_metadata)

        sections = {
            "Education": "",
            "Experience": "",
            "Skills": "",
            "Certifications": ""
        }

        for i in range(1, len(parts), 2):
            label = parts[i].strip("= ")
            content = parts[i + 1].strip()

            if label in sections:
                sections[label] = content

        sections['Experience (Years)'] = sections.pop("Experience")

        sections['Experience (Years)'] = 3
        return sections

