from core.database import SessionLocal
from models.db import PDF, Chunk


def store_data_in_db(pdf_id: str, filename: str, data: list, file_bytes: bytes):
    db = SessionLocal()

    try:
        # 1. store pdf metadata
        doc = PDF(
            pdf_id=pdf_id,
            filename=filename,
            file_bytes=file_bytes
        )

        db.add(doc)

        # 2. store chunks
        for i, chunk in enumerate(data):

            embedding= chunk["embedding"]
            # ensure it's JSON serializable (safety step)
            if hasattr(embedding, "tolist"):
                embedding = embedding.tolist()
            chunk_row = Chunk(
                pdf_id=pdf_id,
                chunk_index=i,
                page=chunk["page"],
                text=chunk["text"],
                embedding=chunk["embedding"]   # ✅ FIXED HERE
            )
            db.add(chunk_row)

        db.commit()

    except Exception as e:
        db.rollback()
        raise e

    finally:
        db.close()

def get_chunks_from_db(pdf_id: str):
    db = SessionLocal()
    try:
        chunks = db.query(Chunk).filter(Chunk.pdf_id == pdf_id).all()
        
        
        return chunks
    except Exception as e:
        raise e
    finally:
        db.close()