from pydantic import BaseModel

class PdfData(BaseModel):
    pdf_id: str
    filename: str
    file_bytes: bytes