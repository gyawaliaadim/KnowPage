
from models.pdf_models import PdfData
from services.chunking import get_chunks
from services.db_service import store_data_in_db
from services.vector_embeddings import get_embeddings


def process_pdf(pdf_data:PdfData):
    pdf_id, filename, file_bytes = pdf_data.pdf_id, pdf_data.filename, pdf_data.file_bytes

    print(pdf_id)
    chunks = get_chunks(pdf_id,file_bytes)

    print("Stored chunks in database")
    print(chunks[0:3])
    embedding_matrix = get_embeddings(chunks)
    # print(embedding_matrix[0:3])
    data = [
  {
    "page": chunks[i]["page"],
    "text": chunks[i]["text"],
    "embedding": embedding_matrix[i]
  }
  for i in range(len(chunks))
]
    print("Connected embeddings and data")
    store_data_in_db(pdf_id,filename,data,file_bytes)
    print("Stored data in database")
    # print(len(chunks))