from core.database import SessionLocal
from models.db import Document, Chunk



def store_chunks_in_db(document_id: str, filename: str, chunks: list):
    db = SessionLocal()

    try:
        # 1. store document metadata

        doc = Document(
            document_id=document_id,
            filename=filename
        )
        # doc2=Document(
        #     document_id="hello12w",
        #     filename="something12"
        # )
        print(document_id, filename)
    
        db.add(doc)
        print("Storing in db1")

        # 2. store chunks
        for i, chunk in enumerate(chunks):
            # print(type(chunk["page"]))
            chunk_file=Chunk(
                document_id=document_id,
                chunk_index=i,
                page=chunk["page"],
                text=chunk["text"]
            )
            db.add(chunk_file)
            
        # print("Storing in db")

        db.commit()

    except Exception as e:
        db.rollback()
        raise e

    finally:
        db.close()
