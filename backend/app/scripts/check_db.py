from sqlalchemy import inspect
from core.database import engine

print(inspect(engine).get_table_names())