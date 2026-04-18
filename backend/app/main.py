from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.v1.routes_query import router as query_router
from api.v1.routes_upload import router as upload_router

from ml.loader import get_model  # preload models

app = FastAPI(title="RAG Backend")

# 🌐 CORS (so Next.js can talk to backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔌 Register routes
app.include_router(query_router, prefix="/api/v1")
app.include_router(upload_router, prefix="/api/v1")


# 🚀 Startup event (CRITICAL for local models)
@app.on_event("startup")
def startup_event():
    print("Loading models...")
    get_model()  # preload embeddings / LLM
    print("Models loaded ✅")


# 🧪 Health check
@app.get("/")
def root():
    return {"status": "ok"}