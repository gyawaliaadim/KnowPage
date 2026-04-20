# 🧠 AI RAG System (Next.js + FastAPI)
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/65dd876a-489b-451c-a874-65ce6810e6a1" />

A full-stack Retrieval-Augmented Generation (RAG) system that lets users upload PDFs, process them into chunks, and prepare them for semantic search using embeddings.

This project focuses on building a **clean, modular backend architecture** and connecting it with a modern frontend.

---

# 🚀 Project Overview

This system allows you to:

1. Upload PDF documents
2. Extract and process text
3. Split text into token-aware chunks
4. Convert chunks to vector embeddings
5. Store processed data in a database
7. Allow users to ask questions
8. Use cosine similarity to semantic retrieval
9. LLM to answer the questions according to user with the context of where it is using RAG
---

# 🏗️ Architecture

### 🔹 Frontend
- Built with **Next.js + React + TypeScript**
- Handles file uploads and UI interaction

### 🔹 Backend
- Built with **FastAPI**
- Handles:
  - PDF ingestion
  - Text extraction
  - Chunking logic
  - API endpoints

### 🔹 Database
- **SQLite (dev)**
- Stores:
  - Documents
  - Chunks

### 🔹 Extras
- Jupyter notebooks used for early experimentation and testing.  
**You can view the initial codes and experiments in** [Prototypes Repo](https://github.com/gyawaliaadim/KnowPagePrototypes)

---

# ⚙️ Backend Design Principles

- Clean separation of concerns:
  - `api/` → routes
  - `services/` → business logic
  - `models/` → database schemas
  - `core/` → config & DB setup

- Versioned API:
  ```
  /api/v1/
  ```

- Pipeline split into:
  - **Ingestion time** (PDF → chunks → store)
  - **Query time** (retrieval → LLM response)

---

# 📦 Features Implemented

✅ PDF upload  
✅ Text extraction  
✅ Token-based chunking (with overlap)  
✅ Page-aware chunk tracking  
✅ SQLite storage  
✅ Modular backend structure  
✅ JSON caching (to avoid recomputation)  

---

# 🧪 Tech Stack

### Frontend
- Next.js
- React.js
- TypeScript

### Backend
- FastAPI
- Python
- Pydantic

### Database
- SQLite

### Tools
- Jupyter Notebook
- tiktoken (for chunking)

---

# ▶️ How to Run

## 🖥️ Frontend

```bash
cd /frontend
npm install
npm run dev
```

---

## ⚙️ Backend

```bash
cd /backend/app
fastapi dev main.py
```

---

# 📂 Project Structure

```
backend/
  app/
    api/
    services/
    models/
    core/
    main.py

frontend/
  (Next.js app)

prototypes/
```

---
# 📷 Screenshots
<div>
<img width="1280" height="648" alt="Sematic retrievel in Jupyter notebook while I was experimenting" src="https://github.com/user-attachments/assets/4f19d443-9dcd-4e37-b9a7-671ec8eb2e73" />
Sematic retrievel in Jupyter notebook while I was experimenting
</div>

<div>
  <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/17814077-caa1-4d5f-ba2b-2911509126f4" />
Fast API backend's API endpoints
</div>
---

---

# 🧠 Key Learnings

- Separating routes, services, and models makes scaling easier
- File handling in FastAPI requires correct `multipart/form-data`
- Python import paths depend heavily on working directory
- Small data type mistakes (like tuple vs string) can break DB logic
- RAG systems must separate ingestion and retrieval phases

---

# 🚀 Future Improvements

- Integrate vector database (pgvector / FAISS / Chroma)
- Optimize performance with background tasks
- Containerize it using docker

---

# 🎯 Goal

This project evolves from simple PDF parsing into a **production-style RAG backend system**, focusing on scalability, structure, and real-world engineering practices.

---
