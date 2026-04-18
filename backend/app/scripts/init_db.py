from core.database import engine
from models.db import Base
import models.db  # important: registers all tables

Base.metadata.create_all(bind=engine)
print("DB initialized")