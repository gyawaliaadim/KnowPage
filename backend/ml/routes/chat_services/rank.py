from ml.loader import get_embedder
from pydantic import BaseModel
from fastapi import APIRouter
from pydantic import BaseModel
from ml.loader import get_embedder
import numpy as np

class RankRequest(BaseModel):
    question: str
    chunks: list[str]


router = APIRouter()

@router.post("/rank")
def rank(req: RankRequest):
    model = get_embedder()

    # embed query
    embeddings = model.encode(
    [req.question] + req.chunks,
    normalize_embeddings=True
)

    query_vec = embeddings[0]
    chunk_vecs = embeddings[1:]


    scores = np.dot(chunk_vecs, query_vec)

    ranked = sorted(
        [
            {"text": text, "score": float(score)}
            for text, score in zip(req.chunks, scores)
        ],
        key=lambda x: x["score"],
        reverse=True
    )

    return {"ranked_chunks": ranked[:3]}