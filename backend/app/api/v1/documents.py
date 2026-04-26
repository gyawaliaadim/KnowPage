from fastapi import APIRouter, UploadFile, File, HTTPException
import uuid
from models.pdf_models import PdfData
from services.pdf_service import process_pdf
from core.config import USE_CACHE, DEV_DOC_ID
from sqlalchemy.orm import Session
from core.database import SessionLocal
from models.db import Document


router = APIRouter(prefix="/documents", tags=["Documents"])


@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # 🔑 generate unique document id
        # if USE_CACHE:
            # document_id=DEV_DOC_ID
        # else:
        document_id = str(uuid.uuid4())
            
        # 📄 read file bytes
        contents = await file.read()
        # print(file)
        # 🚀 process PDF (delegate to service layer)
        pdf_data: PdfData=PdfData(
            
            file_bytes=contents,
            document_id=document_id,
            filename=file.filename
        )
        print("Processing PDF...")
        process_pdf(pdf_data)

        return {
            "document_id": document_id,
            "filename": file.filename,
            "status": "processed"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@router.get("/")  # GET /v1/api/documents
def get_documents():
    print("Fetching all documents from DB...")
    db: Session = SessionLocal()
    docs = db.query(Document).all()
    db.close()
    return docs


@router.get("/{document_id}")  # GET /v1/api/documents/{id}
def get_document(document_id: str):
    db: Session = SessionLocal()
    doc = db.query(Document).filter(Document.document_id == document_id).first()
    db.close()

    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    return doc

@router.delete("/{document_id}")
def delete_document(document_id: str):
    db: Session = SessionLocal()

    doc = db.query(Document).filter(
        Document.document_id == document_id
    ).first()

    if not doc:
        db.close()
        raise HTTPException(status_code=404, detail="Document not found")

    db.delete(doc)
    db.commit()
    db.close()

    return {"status": "deleted", "document_id": document_id}