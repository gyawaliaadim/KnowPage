
from models.pdf_models import PdfData
from services.chunking import get_chunks
from services.db_service import store_chunks_in_db
from services.vector_embeddings import get_embeddings


def process_pdf(pdf_data:PdfData):
    document_id, filename, file_bytes = pdf_data.document_id, pdf_data.filename, pdf_data.file_bytes

    print(document_id)
    chunks = get_chunks(document_id,file_bytes)

    print("Stored chunks in database")
    store_chunks_in_db(document_id,filename,chunks)
    
    embedding_matrix = get_embeddings(chunks)
    print(embedding_matrix)
    # print(len(chunks))