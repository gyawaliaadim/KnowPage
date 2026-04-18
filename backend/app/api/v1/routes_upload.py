from fastapi import APIRouter, UploadFile, File, HTTPException
import uuid
from models.pdf_models import PdfData
from services.pdf_service import process_pdf
from core.config import USE_CACHE, DEV_DOC_ID
router = APIRouter()


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # 🔑 generate unique document id
        if USE_CACHE:
            document_id=DEV_DOC_ID
        else:
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
        process_pdf(pdf_data)

        return {
            "document_id": document_id,
            "filename": file.filename,
            "status": "processed"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))