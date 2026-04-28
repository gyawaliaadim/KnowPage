from fastapi import APIRouter
from pydantic import BaseModel
from ml.loader import get_embedder
from app.core.config import BATCH_SIZE

router = APIRouter()

class ListRequest(BaseModel):
    text: list[str]

@router.post("/embed")
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