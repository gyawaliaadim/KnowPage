import tiktoken
import os
import json
from io import BytesIO
from pypdf import PdfReader
from core.config import USE_CACHE, CACHE_DIR, DEV_CACHE_FILE, DEV_DOC_ID, DEV_CACHE_FILE_PATH
from ml.loader import get_enc,get_nlp
import re


enc=get_enc()
nlp=get_nlp()

def count_tokens(text):
    return len(enc.encode(text))


def clean_text(text):

    # remove excessive whitespace/newlines
    text = re.sub(r"\n+", " ", text)
    text = re.sub(r"\s+", " ", text)

    return text.strip()

def chunk_document(pages, chunk_size=300):
    all_chunks = []
    chunk_id = 0

    for index,page in enumerate(pages):
        sentences = page["sentences"]
        i = 0

        print(i)
        while i < len(sentences):
            current_chunk = []
            current_tokens = 0
            chunk_pages = set()
            start_idx = i

            while i < len(sentences):
                sent = sentences[i]
                sent_tokens = count_tokens(sent)

                if current_tokens + sent_tokens > chunk_size:
                    break

                current_chunk.append(sent)
                current_tokens += sent_tokens
                chunk_pages.add(page["page"])
                i += 1

            # handle edge case: single long sentence
            if not current_chunk and i < len(sentences):
                current_chunk.append(sentences[i])
                current_tokens = count_tokens(sentences[i])
                chunk_pages.add(page["page"])
                i += 1

            chunk_text = clean_text(" ".join(current_chunk))

            if is_valid_chunk(chunk_text):
                all_chunks.append({
                    "chunk_id": chunk_id,
                    "pages": sorted(list(chunk_pages)),
                    "text": chunk_text,
                    "tokens": current_tokens,
                    "num_sentences": len(current_chunk)
                })

                chunk_id += 1

            # overlap control (simple + safe)
            overlap_sentences = 2

            i = i - overlap_sentences
            if i < 0:
                i = 0

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

def split_sentences(text):
    
    doc = nlp(text)
    return [sent.text.strip() for sent in doc.sents if sent.text.strip()]


def getPages(pages_raw):
    pages = []

    for i, page in enumerate(pages_raw):
        text = page.extract_text()

        if text.strip():
            sentences = split_sentences(text)

            pages.append({
                "page": i + 1,
                "sentences": sentences
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
