from fastapi import FastAPI
import uvicorn

app = FastAPI(title="RAG Service", version="1.0.0")

@app.get("/health")
def health():
    return {"ok": True, "service": "RAG"}

@app.post("/reindex")
def reindex():
    print("RAG reindex triggered by orchestrator")
    return {"ok": True, "message": "RAG reindex triggered"}

@app.get("/latest")
def latest():
    return {"ok": True, "content": "Latest RAG content", "timestamp": "2025-10-14T00:00:00Z"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)