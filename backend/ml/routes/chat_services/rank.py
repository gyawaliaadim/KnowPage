from fastapi import APIRouter
from pydantic import BaseModel
from ml.loader import get_embedder
import numpy as np

class Chunk(BaseModel):
    text: str
    chunk_id: str | int
    page: int

class RankRequest(BaseModel):
    question: str
    chunks: list[Chunk]

router = APIRouter()

@router.post("/rank")
def rank(req: RankRequest):
    model = get_embedder()

    texts = [c.text for c in req.chunks]
    metas = req.chunks

    embeddings = model.encode(
        [req.question] + texts,
        normalize_embeddings=True
    )

    query_vec = embeddings[0]
    chunk_vecs = embeddings[1:]

    scores = np.dot(chunk_vecs, query_vec)

    ranked = sorted(
        [
            {
                "text": meta.text,
                "chunk_id": meta.chunk_id,
                "page": meta.page,
                "score": float(score),
            }
            for meta, score in zip(metas, scores)
        ],
        key=lambda x: x["score"],
        reverse=True
    )

    return {"ranked_chunks": ranked[:3]}