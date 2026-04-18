from app.core.database import engine
from app.models.db import Base
import app.models.db  # important: registers all tables

Base.metadata.create_all(bind=engine)
print("DB initialized")