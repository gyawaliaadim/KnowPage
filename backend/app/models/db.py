from sqlalchemy import Column, String, Integer, Text
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass


class Document(Base):
    __tablename__ = "documents"

    document_id = Column(String, primary_key=True)
    filename = Column(String)


class Chunk(Base):
    __tablename__ = "chunks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    document_id = Column(String)
    chunk_index = Column(Integer)
    page = Column(Integer)
    text = Column(Text)