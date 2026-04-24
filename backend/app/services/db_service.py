from core.database import SessionLocal
from models.db import Document, Chunk


def store_data_in_db(document_id: str, filename: str, data: list):
    db = SessionLocal()

    try:
        # 1. store document metadata
        doc = Document(
            document_id=document_id,
            filename=filename
        )

        # print(f"Storing document: {document_id}, {filename}")
        db.add(doc)

        # 2. store chunks
        for i, chunk in enumerate(data):
            if i==1:
                print(chunk)
            embedding = chunk["embedding"]
          
            # ensure it's JSON serializable (safety step)
            if hasattr(embedding, "tolist"):
                embedding = embedding.tolist()
            chunk_row = Chunk(
                document_id=document_id,
                chunk_index=i,
                page=chunk["page"],
                text=chunk["text"],
                # embedding=embedding   # ✅ FIXED HERE
            )
            # print("Till here done")

            db.add(chunk_row)

        db.commit()

    except Exception as e:
        db.rollback()
        raise e

    finally:
        db.close()