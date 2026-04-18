from fastapi import APIRouter, HTTPException
from models.schemas import QueryRequest, QueryResponse
from services.rag_pipeline import run_rag

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
def query_docs(request: QueryRequest):
    try:
        answer = run_rag(request)
        print(request)
        return QueryResponse(
            answer=answer,
            status="success"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))