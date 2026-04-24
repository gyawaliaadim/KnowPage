from fastapi import FastAPI
from pydantic import BaseModel
from ml.loader import get_embedder, get_nlp
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
from fastapi import UploadFile, File
from pypdf import PdfReader

@app.post("/nlp")
def nlp(file: UploadFile = File(...)):
    print("Processing full document...")

    nlp_model = get_nlp()
    reader = PdfReader(file.file)

    pages = []

    for i, page in enumerate(reader.pages):
        text = page.extract_text() or ""

        if text.strip():
            doc = nlp_model(text)
            sentences = [s.text.strip() for s in doc.sents if s.text.strip()]
        else:
            sentences = []

        pages.append({
            "page": i + 1,
            "sentences": sentences
        })

    return {"pages": pages}