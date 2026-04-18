import tiktoken
import os
import json
from io import BytesIO
from pypdf import PdfReader
from core.config import USE_CACHE, CACHE_DIR, DEV_CACHE_FILE, DEV_DOC_ID, DEV_CACHE_FILE_PATH

enc = tiktoken.get_encoding("cl100k_base")  # safe default

def chunk_document(pages, chunk_size=250, overlap=100):
    all_chunks = []

    for page in pages:
        text = page["text"]

        tokens = enc.encode(text)

        start = 0
        while start < len(tokens):
            end = start + chunk_size

            chunk_tokens = tokens[start:end]
            chunk_text = enc.decode(chunk_tokens)

            all_chunks.append({
                "page": page["page"],
                "text": chunk_text
            })

            start = end - overlap

    return all_chunks

def save_chunks(chunks):
    os.makedirs("cache", exist_ok=True)
    
    # path = f"{CACHE_DIR}/{DEV_CACHE_FILE}"
    # else:
        # path = f"cache/document"
    with open(DEV_CACHE_FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)

    print("Saved cache at:", DEV_CACHE_FILE_PATH)

    return DEV_CACHE_FILE_PATH

def load_chunks():
    # path = f"{CACHE_DIR}/{DEV_CACHE_FILE}"

    with open(DEV_CACHE_FILE_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def getPages(pagesRaw):
    pages=[]
    for i,page in enumerate(pagesRaw):
        text = page.extract_text()
        # print(text)
        if text:
            pages.append({
                "page":i+1,
                "text":text
            })
    return pages

def get_chunks(document_id,file_bytes):
    
    if USE_CACHE:
        chunks = load_chunks()
    else:
        # convert file bytes to stream
        file_stream = BytesIO(file_bytes)
        reader=PdfReader(file_stream)
        print("Getting pages")
        pages=reader.pages
        pages=getPages(pages)

        print("Chunking")
        # Chunking

        chunks = chunk_document(pages)
        print(len(chunks))
        save_chunks(chunks)
    return chunks
