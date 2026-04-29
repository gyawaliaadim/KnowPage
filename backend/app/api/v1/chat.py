from fastapi import APIRouter, HTTPException
from requests import Session
from core.database import SessionLocal
from models.db import Message
from models.schemas import ChatRequest, ChatResponse
from services.chat_services.chat_service import chat

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/", response_model=ChatResponse)
def chat_docs(request: ChatRequest):
    try:

        chat(request)
        # print(request)
        return ChatResponse(
            
            status="success"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/{pdf_id}")
def get_chat_history(pdf_id: str):
    db: Session = SessionLocal()

    try:
        messages = (
            db.query(Message)
            .filter(Message.pdf_id == pdf_id)
            .order_by(Message.created_at.asc())  # important for chat order
            .all()
        )

        return [
            {
                "id": msg.id,
                "role": msg.role,
                "content": msg.content,
                "created_at": msg.created_at,
                "contexts": msg.contexts
            }
            for msg in messages
        ]

    finally:
        db.close()