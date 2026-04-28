

from models.schemas import ChatRequest
from services.api_app import APIClient
from core.config import MODEL_URL
from services.db_service import get_chunks_from_db
import numpy as np

def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

client = APIClient(MODEL_URL)

def chat(req: ChatRequest):
    print("Generating embedding...")
    chat_embedding = client.post('/embedChat', data = {"text": req.question})["embedding"]
    chunks = get_chunks_from_db(req.pdf_id)
    # print(chunks)
    results = []

    for chunk in chunks:
        score = cosine_similarity(chat_embedding, chunk.embedding)
        # print("score",score)
        results.append({
            "text": chunk.text,
            "page": chunk.page,
            "score": score
        })
    # sort highest similarity first
    results = sorted(results, key=lambda x: x["score"], reverse=True)
    top_k = results[:15]   # NOT 3, use 5
    ranked = client.post('/rank', data = {
        "question": req.question,
        "chunks": [c["text"] for c in top_k]
    })["ranked_chunks"]