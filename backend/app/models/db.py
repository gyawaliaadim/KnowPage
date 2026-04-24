from sqlalchemy import Column, String, Integer, Text, JSON
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass


class Document(Base):
    __tablename__ = "documents"
    id =  Column(Integer, primary_key=True, autoincrement=True)
    document_id = Column(String)
    filename = Column(String)


class Chunk(Base):
    __tablename__ = "chunks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    document_id = Column(String, index=True)
    chunk_index = Column(Integer)
    page = Column(Integer)
    text = Column(Text)
    embedding = Column(JSON)  # stores vector list