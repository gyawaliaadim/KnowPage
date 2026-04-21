# app/core/config.py

DEV_DOC_ID = "docs_cache"
BATCH_SIZE=32
USE_CACHE = False
MODEL_NAME = "nomic-ai/nomic-embed-text-v1.5"
CACHE_DIR = "cache"
CHUNK_SIZE = 500
OVERLAP = 100
MODEL_URL = "http://127.0.0.1:8001"
# optional (if you insist on fixed file)
DEV_CACHE_FILE = f"{DEV_DOC_ID}.json"

DEV_CACHE_FILE_PATH = f"{CACHE_DIR}/{DEV_CACHE_FILE}"