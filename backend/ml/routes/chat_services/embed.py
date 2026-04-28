from fastapi import APIRouter
from pydantic import BaseModel
from ml.loader import get_embedder

router = APIRouter()

class ChatRequest(BaseModel):
    text: str

@router.post("/embedChat")
def embed(req: ChatRequest):
    # print("Generating embedding...")
    # print(req.text)
    model = get_embedder()

    vectors = model.encode(
        req.text,
        normalize_embeddings=True
    )

    return {
        "embedding": vectors.tolist()
    }