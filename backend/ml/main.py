from fastapi import FastAPI
from ml.loader import get_embedder, get_nlp
from app.core.config import BATCH_SIZE

from ml.routes.chat_services.embed import router as chat_embed_router
from ml.routes.chat_services.rank import router as rank_router

from ml.routes.pdf_services.embed import router as embed_router
from ml.routes.pdf_services.nlp import router as nlp_router

app = FastAPI(title="ML Model Service")

# ---- register routes ----
app.include_router(embed_router)
app.include_router(nlp_router)
app.include_router(chat_embed_router)
app.include_router(rank_router)

# ---- warm-up ----
@app.on_event("startup")
def startup():
    print("Loading models...")
    get_embedder()
    get_nlp()
    print("Models ready 🔥")


@app.get("/health")
def health():
    return {"status": "healthy"}