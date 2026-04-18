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
        print("Storing in db")
        db.add(doc)

        # 2. store chunks
        print(document_id)
        print(type(document_id))
        for i, chunk in enumerate(chunks):
            db.add(Chunk(
                document_id=document_id,
                chunk_index=i,
                page=chunk["page"],
                text=chunk["text"]
            ))
        # print("Storing in db")

        db.commit()

    except Exception as e:
        db.rollback()
        raise e

    finally:
        db.close()
