from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("sqlite:///./rag.db")
SessionLocal = sessionmaker(bind=engine)