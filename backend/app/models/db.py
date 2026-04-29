from datetime import datetime

from sqlalchemy import Column, String, Integer, Text, JSON, LargeBinary, ForeignKey, DateTime
from sqlalchemy.orm import DeclarativeBase, relationship

class Base(DeclarativeBase):
    pass


class PDF(Base):
    __tablename__ = "pdfs"
    pdf_id = Column(String, unique=True, index=True, primary_key=True)  # unique identifier for the PDF
    filename = Column(String)
    file_bytes = Column(LargeBinary)  # Store file bytes as string (e.g., base64)
    chunks = relationship("Chunk", back_populates="pdf")

class Chunk(Base):
    __tablename__ = "chunks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    pdf_id = Column(String, ForeignKey("pdfs.pdf_id"))
    chunk_index = Column(Integer)
    page = Column(Integer)
    text = Column(Text)
    embedding = Column(JSON)  # stores vector list
    pdf = relationship("PDF", back_populates="chunks")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    pdf_id = Column(String, index=True)   # key idea
    role = Column(String)                 # "user" | "assistant"
    content = Column(Text)
    contexts = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)