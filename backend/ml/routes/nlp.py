from fastapi import APIRouter, UploadFile, File
from pypdf import PdfReader
from ml.loader import get_nlp

router = APIRouter()

@router.post("/nlp")
def nlp(file: UploadFile = File(...)):
    print("Processing full pdf...")

    nlp_model = get_nlp()
    reader = PdfReader(file.file)

    pages = []

    for i, page in enumerate(reader.pages):
        text = page.extract_text() or ""

        if text.strip():
            doc = nlp_model(text)
            sentences = [s.text.strip() for s in doc.sents if s.text.strip()]
        else:
            sentences = []

        pages.append({
            "page": i + 1,
            "sentences": sentences
        })

    return {"pages": pages}