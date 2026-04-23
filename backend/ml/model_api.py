from fastapi import FastAPI
from pydantic import BaseModel
from loader import get_embedder, get_nlp
from app.core.config import BATCH_SIZE
app = FastAPI(title="ML Model Service")

# ---- request schema ----
class ListRequest(BaseModel):
    text: list[str]
    
class TextRequest(BaseModel):
    text: str


# ---- warm-up on startup ----
@app.on_event("startup")
def startup():
    print("Loading models...")
    get_embedder()
    get_nlp()
    print("Models ready 🔥")


@app.get("/health")
def health():
    return {"status": "healthy"}

# ---- embedding endpoint ----
@app.post("/embed")
def embed(req: ListRequest):
    print("Generating embedding...")
    model = get_embedder()

    vectors = model.encode(
        req.text,
        batch_size=BATCH_SIZE,
        normalize_embeddings=True
    )

    return {
        "embedding": vectors.tolist()
    }


# ---- NLP pipeline endpoint ----
@app.post("/nlp")
def nlp(req: TextRequest):
    print("Processing text with NLP pipeline...")
    nlp_model = get_nlp()
    doc = nlp_model(req.text)
    sentences = [sent.text.strip() for sent in doc.sents if sent.text.strip()]
    return {
        "sentences": sentences
    }


