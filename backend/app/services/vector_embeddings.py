
from core.config import BATCH_SIZE, MODEL_URL
import requests
# =========================
# 4. EMBEDDING FUNCTION
# =========================

def embed_texts(text_list: list):
    response = requests.post(
        f"{MODEL_URL}/embed",
        json={"text": text_list}
    )

    response.raise_for_status()

    return response.json()["embedding"]

def get_embeddings(chunks):
    print("Generating embeddings...")
    texts=[chunk['texts'] for chunk in chunks]
    print(texts[:2])


    embeddings_matrix = embed_texts(texts)
    return embeddings_matrix