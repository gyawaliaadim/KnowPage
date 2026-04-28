from fastapi import APIRouter, HTTPException
from models.schemas import ChatRequest, ChatResponse
from services.chat_services.chat_service import chat

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/", response_model=ChatResponse)
def chat_docs(request: ChatRequest):
    try:
        answer = chat(request)
        print(request)
        return ChatResponse(
            answer=answer,
            status="success"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))