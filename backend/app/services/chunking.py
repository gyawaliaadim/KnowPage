import requests
from sqlalchemy import text
import tiktoken
import os
import json
from io import BytesIO
from pypdf import PdfReader
from core.config import USE_CACHE, CACHE_DIR, DEV_CACHE_FILE, DEV_DOC_ID, DEV_CACHE_FILE_PATH, CHUNK_SIZE, OVERLAP,MODEL_URL
import re
from services.api_app import APIClient

client = APIClient(MODEL_URL)


def clean_text(text):

    # remove excessive whitespace/newlines
    text = re.sub(r"\n+", " ", text)
    text = re.sub(r"\s+", " ", text)

    return text.strip()

def chunk_pdf(pages, max_words=100, overlap_words=20):
    chunks = []
    j=0
    for page_data in pages:
        sentences = page_data["sentences"]

        current_chunk = []
        current_word_count = 0

        i = 0
        while i < len(sentences):
            sentence = sentences[i]
            words = sentence.split()
            word_count = len(words)

            # add sentence
            current_chunk.append(sentence)
            current_word_count += word_count

            # if limit reached → save chunk
            if current_word_count >= max_words:
                chunks.append({
                    "page": page_data["page"],
                    "text": " ".join(current_chunk),
                    "chunk_id": j
                })

                # 🔁 overlap logic
                overlap_chunk = []
                overlap_count = 0

                # take sentences from end until overlap_words reached
                for s in reversed(current_chunk):
                    w = len(s.split())
                    overlap_chunk.insert(0, s)
                    overlap_count += w
                    if overlap_count >= overlap_words:
                        break

                current_chunk = overlap_chunk
                current_word_count = overlap_count

            i += 1

        # leftover
        if current_chunk:
            chunks.append({
                "page": page_data["page"],
                "text": " ".join(current_chunk),
                "chunk_id": j
            })
    j+=1
    return chunks
def save_chunks(chunks):
    os.makedirs("cache", exist_ok=True)
    
    # path = f"{CACHE_DIR}/{DEV_CACHE_FILE}"
    # else:
        # path = f"cache/pdf"
    with open(DEV_CACHE_FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)

    print("Saved cache at:", DEV_CACHE_FILE_PATH)

    return DEV_CACHE_FILE_PATH

def is_valid_chunk(text):
    
    if len(text.strip()) < 30:
        return False

    # mostly bullet junk
    if len(re.sub(r"[^a-zA-Z]", "", text)) < 20:
        return False

    return True

def load_chunks():
    # path = f"{CACHE_DIR}/{DEV_CACHE_FILE}"

    with open(DEV_CACHE_FILE_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

# def getPages(pages_raw):
#     return client.post("/nlp", json={"pages_raw": pages_raw})["pages"]
    

# def get_chunks(pdf_id,file_bytes):
    
#     if USE_CACHE:
#         chunks = load_chunks()
#     else:

#         # convert file bytes to stream
#         file_stream = BytesIO(file_bytes)
#         reader=PdfReader(file_stream)

#         pages=reader.pages
#         pages=getPages(pages)


#         # Chunking
#         chunks = chunk_pdf(pages)
#         print(chunks)
#         save_chunks(chunks)
#     return chunks


def get_chunks(pdf_id, file_bytes):
    if USE_CACHE:
        return load_chunks()

    response = client.post_file("/nlp", file_bytes)
    pages= response["pages"]

    # print(pages[:2])
    chunks= chunk_pdf(pages)
    print(chunks[0:2])
    save_chunks(chunks)
    return chunks