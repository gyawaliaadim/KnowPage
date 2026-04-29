from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.pdfs import router as pdfs_router
from app.api.v1.chat import router as chat_router


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
app.include_router(chat_router, prefix="/api/v1")
app.include_router(pdfs_router, prefix="/api/v1")


# 🚀 Startup event (CRITICAL for local models)
@app.on_event("startup")
def startup_event():
    print("Server started. Ready to process PDFs and queries! 🚀")


# 🧪 Health check
@app.get("/")
def root():
    return {"status": "ok"}