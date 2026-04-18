from pydantic import BaseModel

class PdfData(BaseModel):
    document_id: str
    filename: str
    file_bytes: bytes