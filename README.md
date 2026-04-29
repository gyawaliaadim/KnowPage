# KnowPage

> **Turn any PDF into a conversational knowledge base — powered by AI.**

KnowPage is a Retrieval-Augmented Generation (RAG) application that lets you upload PDFs and interact with them through natural language. Instead of manually skimming long documents, you ask questions and get precise, sourced answers — grounded in your actual content, not generic AI guesses. It is a project made for the **Hackspire Hackathon**.

---

## ✨ Features

- 📄 **Upload & index** any PDF instantly
- 💬 **Ask questions** in natural language
- 🎯 **Context-aware answers** grounded in your document — not hallucinated
- 🔍 **Source transparency** — every answer links back to the exact page and chunk it came from
- ⚡ **No fine-tuning needed** — just upload and go

---

## 🧠 How It Works

```
PDF Upload → Text Extraction → Chunking → Embeddings (Vector Store)
                                                        ↓
User Query → Query Embedding → Semantic Search → Top Chunks
                                                        ↓
                                          Reranking + LLM Generation
                                                        ↓
                                         Answer + Source References
```

1. **Upload** — User uploads a PDF via the UI
2. **Processing** — Backend extracts text, splits it into chunks, and stores metadata (page number, chunk index)
3. **Embeddings** — Each chunk is converted into a vector; semantically similar content maps to nearby positions in vector space
4. **Retrieval** — On each query, the user's question is embedded and the most semantically relevant chunks are retrieved
5. **Generation** — Retrieved chunks are reranked, then sent alongside the query to an LLM, which generates a grounded answer

---

## 🏗️ Architecture

```
knowpage/
├── frontend/          # Next.js app (UI, PDF viewer, chat)
├── backend/
│   ├── app/           # FastAPI server (REST API, PDF management)
│   └── ml/            # ML service (embeddings, retrieval, generation)
```

| Service | Tech | Port |
|---|---|---|
| Frontend | Next.js | 3000 |
| Backend API | FastAPI | 8000 |
| ML Service | FastAPI + Uvicorn | 8001 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- pip

### 1. Clone the repository

```bash
git clone https://github.com/gyawaliaadim/KnowPage
cd KnowPage
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Start the Backend API

```bash
cd backend
pip install -r requirements.txt
cd app
fastapi dev main.py
```

### 4. Start the ML Service

```bash
# In a new terminal, from the project root
cd backend/ml
uvicorn main:app --port 8001
```

All three services need to be running simultaneously. Once up, open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 Request Flow

```
Browser (Next.js)
      │
      ▼
FastAPI Backend (8000)  ──────►  ML Service (8001)
      │                          (embed, retrieve, rerank, generate)
      ▼
  SQLite
```

---

## 💡 Why RAG?

Traditional LLMs answer from their training data — which is static, potentially outdated, and unaware of your private documents. RAG solves this by:

- **Grounding** responses in your actual content
- **Citing sources** so you can verify every answer
- **Staying current** — no retraining needed when documents change

Think of it like a smart librarian: you ask a question, it finds the most relevant pages, and explains the answer using exactly those pages.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)
