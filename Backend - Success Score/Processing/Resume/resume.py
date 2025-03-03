import nltk
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import re
from nltk.corpus import words

nltk_data_path = os.path.join(os.getcwd(), 'nltk_data')

if not os.path.exists(os.path.join(nltk_data_path, 'corpora', 'words.zip')):
    nltk.download('words', download_dir=nltk_data_path)

nltk.data.path.append(nltk_data_path)

valid_words = set(words.words())

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
    
    for key, value in extracted_data.items():
        new_value = value.replace("\n", " ")
        extracted_data[key] = new_value

    return extracted_data