#!/usr/bin/env python3
"""
Simplified RAG MCP Service - Local Version
This is a minimal vector search service using simple text matching
"""

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Dict, Optional
import json
import logging
import re
from difflib import SequenceMatcher

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Simple RAG MCP Service", version="1.0.0")

# Simple document store (in-memory for demo)
documents = [
    {
        "id": "carpentry_1",
        "content": "Oak is a premium hardwood used in high-quality furniture and cabinetry. It's known for durability and beautiful grain patterns.",
        "metadata": {"category": "materials", "type": "wood"}
    },
    {
        "id": "carpentry_2",
        "content": "Traditional carpentry techniques include joinery, carving, and finishing. These skills require years of practice to master.",
        "metadata": {"category": "techniques", "type": "skills"}
    },
    {
        "id": "carpentry_3",
        "content": "Custom furniture building involves precise measurements, quality materials, and attention to detail. Each piece is crafted to meet specific requirements.",
        "metadata": {"category": "services", "type": "custom"}
    },
    {
        "id": "carpentry_4",
        "content": "Florida's climate requires special considerations for outdoor carpentry projects. Materials must be resistant to humidity and temperature changes.",
        "metadata": {"category": "climate", "type": "outdoor"}
    }
]

class Document(BaseModel):
    id: str
    content: str
    metadata: Optional[Dict] = {}

class QueryRequest(BaseModel):
    query: str
    top_k: int = 3
    threshold: float = 0.3

class QueryResponse(BaseModel):
    query: str
    results: List[Dict]
    confidence: float
    source: str

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    documents_count: int

class AddDocumentRequest(BaseModel):
    documents: List[Document]

def calculate_similarity(text1: str, text2: str) -> float:
    """Simple text similarity using SequenceMatcher"""
    return SequenceMatcher(None, text1.lower(), text2.lower()).ratio()

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint for MCP monitoring"""
    return HealthResponse(
        status="healthy",
        service="simple-rag-mcp-service",
        version="1.0.0",
        documents_count=len(documents)
    )

@app.post("/add_documents")
async def add_documents(request: AddDocumentRequest):
    """Add documents to the store"""
    try:
        global documents
        new_docs = []

        for doc in request.documents:
            new_docs.append({
                "id": doc.id,
                "content": doc.content,
                "metadata": doc.metadata
            })

        documents.extend(new_docs)

        logger.info(f"Added {len(new_docs)} documents to store")

        return {
            "status": "success",
            "documents_added": len(new_docs),
            "total_documents": len(documents)
        }

    except Exception as e:
        logger.error(f"Error adding documents: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error adding documents: {str(e)}")

@app.post("/query", response_model=QueryResponse)
async def query_documents(request: QueryRequest):
    """Query documents using simple text similarity"""
    try:
        if len(documents) == 0:
            return QueryResponse(
                query=request.query,
                results=[],
                confidence=0.0,
                source="simple-rag-service"
            )

        # Calculate similarity scores
        scored_docs = []
        for doc in documents:
            similarity = calculate_similarity(request.query, doc["content"])
            if similarity >= request.threshold:
                scored_docs.append({
                    "doc": doc,
                    "score": similarity
                })

        # Sort by similarity score
        scored_docs.sort(key=lambda x: x["score"], reverse=True)

        # Take top k results
        top_k = min(request.top_k, len(scored_docs))
        results = []

        for i, item in enumerate(scored_docs[:top_k]):
            doc = item["doc"]
            results.append({
                "id": doc["id"],
                "content": doc["content"],
                "metadata": doc["metadata"],
                "similarity_score": float(item["score"]),
                "rank": i + 1
            })

        # Calculate overall confidence
        confidence = max([r["similarity_score"] for r in results], default=0.0) if results else 0.0

        logger.info(f"Query processed: '{request.query}' - Found {len(results)} relevant documents")

        return QueryResponse(
            query=request.query,
            results=results,
            confidence=confidence,
            source="simple-rag-service"
        )

    except Exception as e:
        logger.error(f"Error querying documents: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error querying documents: {str(e)}")

@app.get("/query")
async def query_documents_get(q: str, top_k: int = 3, threshold: float = 0.3):
    """Query documents using GET request (for simple testing)"""
    request = QueryRequest(query=q, top_k=top_k, threshold=threshold)
    return await query_documents(request)

@app.delete("/clear")
async def clear_documents():
    """Clear all documents from the store"""
    try:
        global documents
        documents = []

        logger.info("Cleared all documents from store")

        return {
            "status": "success",
            "message": "All documents cleared",
            "documents_count": 0
        }

    except Exception as e:
        logger.error(f"Error clearing documents: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error clearing documents: {str(e)}")

@app.get("/stats")
async def get_stats():
    """Get store statistics"""
    return {
        "total_documents": len(documents),
        "model": "simple-text-matching",
        "threshold_range": "0.0-1.0"
    }

@app.post("/sync_from_docling")
async def sync_from_docling(docling_url: str = "http://localhost:8000"):
    """Sync documents from Docling service (example integration)"""
    try:
        logger.info(f"Sync request from Docling service at {docling_url}")

        # Add sample documents that would come from Docling
        sample_docs = [
            Document(
                id="docling_1",
                content="Document parsed by Docling service. This demonstrates integration between document parsing and vector search.",
                metadata={"source": "docling_service", "category": "parsed"}
            )
        ]

        await add_documents(AddDocumentRequest(documents=sample_docs))

        return {
            "status": "success",
            "message": "Sample documents added from Docling integration",
            "documents_added": len(sample_docs)
        }

    except Exception as e:
        logger.error(f"Error syncing from Docling: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error syncing from Docling: {str(e)}")

@app.get("/")
async def root():
    """Root endpoint with service information"""
    return {
        "service": "Simple RAG MCP Service",
        "version": "1.0.0",
        "description": "Simplified vector search service for MCP integration",
        "endpoints": {
            "health": "/health",
            "query": "/query",
            "add_documents": "/add_documents",
            "stats": "/stats",
            "clear": "/clear",
            "sync_from_docling": "/sync_from_docling"
        },
        "documents_count": len(documents)
    }

if __name__ == "__main__":
    import uvicorn
    print("Starting Simple RAG MCP Service on port 8001...")
    print("Pre-loaded documents:", len(documents))
    uvicorn.run(app, host="0.0.0.0", port=8001)