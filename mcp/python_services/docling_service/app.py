from fastapi import FastAPI
import uvicorn

app = FastAPI(title="Docling Service", version="1.0.0")

@app.get("/health")
def health():
    return {"ok": True, "service": "Docling"}

@app.post("/parse")
def parse():
    print("Docling parse triggered by orchestrator")
    return {"ok": True, "message": "Docling parse triggered", "parsed_content": "Sample parsed content"}

@app.get("/latest")
def latest():
    return {"ok": True, "content": "Latest Docling content", "timestamp": "2025-10-14T00:00:00Z"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)