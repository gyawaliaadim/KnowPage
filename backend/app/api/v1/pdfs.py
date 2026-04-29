from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import Response
import uuid
from app.models.pdf_models import PdfData
from app.services.pdf_services.pdf_service import process_pdf
from app.core.config import USE_CACHE, DEV_DOC_ID
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.db import PDF


router = APIRouter(prefix="/pdfs", tags=["PDFs"])


@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # 🔑 generate unique pdf id
        # if USE_CACHE:
            # pdf_id=DEV_DOC_ID
        # else:
        pdf_id = str(uuid.uuid4())
            
        # 📄 read file bytes
        contents = await file.read()

        # 🚀 process PDF (delegate to service layer)
        pdf_data: PdfData=PdfData(
            
            file_bytes=contents,
            pdf_id=pdf_id,
            filename=file.filename
        )
        print("Processing PDF...")
        process_pdf(pdf_data)

        return {
            "pdf_id": pdf_id,
            "filename": file.filename,
            "status": "processed"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
def get_pdfs():
    db: Session = SessionLocal()
    print("Fetching PDFs from database...")
    try:
        pdfs = db.query(PDF).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

    return [
        {
            "pdf_id": pdf.pdf_id,
            "filename": pdf.filename
        }
        for pdf in pdfs
    ]

import base64
from fastapi import HTTPException

@router.get("/{pdf_id}")
def get_pdf(pdf_id: str):
    db: Session = SessionLocal()
    try:
        doc = db.query(PDF).filter(PDF.pdf_id == pdf_id).first()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

    if not doc:
        raise HTTPException(status_code=404, detail="PDF not found")

    return {
        "pdf_id": doc.pdf_id,
        "filename": doc.filename
    }

@router.delete("/{pdf_id}")
def delete_pdf(pdf_id: str):
    db: Session = SessionLocal()

    doc = db.query(PDF).filter(
        PDF.pdf_id == pdf_id
    ).first()

    if not doc:
        db.close()
        raise HTTPException(status_code=404, detail="PDF not found")

    db.delete(doc)
    db.commit()
    db.close()

    return {"status": "deleted", "pdf_id": pdf_id}


@router.get("/{pdf_id}/download")
def download_pdf(pdf_id: str):
    db: Session = SessionLocal()
    doc = db.query(PDF).filter(PDF.pdf_id == pdf_id).first()
    db.close()

    if not doc:
        raise HTTPException(status_code=404, detail="PDF not found")

    return Response(
        content=doc.file_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'inline; filename="{doc.filename}"'
        }
    )