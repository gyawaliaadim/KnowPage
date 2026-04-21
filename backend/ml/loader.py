from functools import lru_cache
import spacy
from sentence_transformers import SentenceTransformer
from app.core.config import MODEL_NAME

@lru_cache(maxsize=1)
def get_embedder():
    print("Loading embedder...")
    return SentenceTransformer(MODEL_NAME)

@lru_cache(maxsize=1)
def get_nlp():
    print("Loading spacy...")
    return spacy.load("en_core_web_sm")

def get_model():
    return {
        "embedder": get_embedder(),
        "nlp": get_nlp()
    }