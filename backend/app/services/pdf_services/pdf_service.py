
from models.pdf_models import PdfData
from services.pdf_services.chunking_service import get_chunks
from services.db_service import store_data_in_db
from services.pdf_services.embedding_service import get_embeddings
import time

def process_pdf(pdf_data:PdfData):
    
    pdf_id, filename, file_bytes = pdf_data.pdf_id, pdf_data.filename, pdf_data.file_bytes

    chunks = get_chunks(pdf_id,file_bytes)

    print("Stored chunks in database")
   
    embedding_matrix = get_embeddings(chunks)
  
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
