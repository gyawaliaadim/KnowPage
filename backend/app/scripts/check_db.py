from sqlalchemy import inspect
from app.core.database import engine

print(inspect(engine).get_table_names())