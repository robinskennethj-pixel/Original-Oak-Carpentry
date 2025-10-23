from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json
import os
import logging
from typing import List, Dict, Optional
import requests

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="RAG MCP Service", version="1.0.0")

# Initialize sentence transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Initialize FAISS index
dimension = 384  # Dimension of all-MiniLM-L6-v2 embeddings
index = faiss.IndexFlatL2(dimension)

# Store for document chunks and metadata
documents = []
doc_embeddings = []

class Document(BaseModel):
    id: str
    content: str
    metadata: Optional[Dict] = {}

class QueryRequest(BaseModel):
    query: str
    top_k: int = 5
    threshold: float = 0.7

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

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint for MCP monitoring"""
    return HealthResponse(
        status="healthy",
        service="rag-mcp-service",
        version="1.0.0",
        documents_count=len(documents)
    )

@app.post("/add_documents")
async def add_documents(request: AddDocumentRequest):
    """Add documents to the vector store"""
    try:
        new_docs = []
        new_embeddings = []

        for doc in request.documents:
            # Generate embedding
            embedding = model.encode(doc.content)

            new_docs.append({
                "id": doc.id,
                "content": doc.content,
                "metadata": doc.metadata
            })
            new_embeddings.append(embedding)

        # Add to FAISS index
        if new_embeddings:
            embeddings_array = np.array(new_embeddings).astype('float32')
            index.add(embeddings_array)
            documents.extend(new_docs)
            doc_embeddings.extend(new_embeddings)

        logger.info(f"Added {len(new_docs)} documents to vector store")

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
    """Query documents using vector similarity search"""
    try:
        if len(documents) == 0:
            return QueryResponse(
                query=request.query,
                results=[],
                confidence=0.0,
                source="rag-mcp-service"
            )

        # Generate query embedding
        query_embedding = model.encode(request.query)
        query_array = np.array([query_embedding]).astype('float32')

        # Search in FAISS index
        k = min(request.top_k, len(documents))
        distances, indices = index.search(query_array, k)

        # Prepare results
        results = []
        for i, (distance, idx) in enumerate(zip(distances[0], indices[0])):
            if idx < len(documents):
                # Convert distance to similarity score (0-1)
                similarity = 1 / (1 + distance)

                if similarity >= request.threshold:
                    doc = documents[idx]
                    results.append({
                        "id": doc["id"],
                        "content": doc["content"],
                        "metadata": doc["metadata"],
                        "similarity_score": float(similarity),
                        "rank": i + 1
                    })

        # Calculate overall confidence
        confidence = max([r["similarity_score"] for r in results], default=0.0) if results else 0.0

        logger.info(f"Query processed: '{request.query}' - Found {len(results)} relevant documents")

        return QueryResponse(
            query=request.query,
            results=results,
            confidence=confidence,
            source="rag-mcp-service"
        )

    except Exception as e:
        logger.error(f"Error querying documents: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error querying documents: {str(e)}")

@app.get("/query")
async def query_documents_get(q: str, top_k: int = 5, threshold: float = 0.7):
    """Query documents using GET request (for simple testing)"""
    request = QueryRequest(query=q, top_k=top_k, threshold=threshold)
    return await query_documents(request)

@app.delete("/clear")
async def clear_documents():
    """Clear all documents from the vector store"""
    try:
        global documents, doc_embeddings, index

        # Reset everything
        documents = []
        doc_embeddings = []
        index = faiss.IndexFlatL2(dimension)

        logger.info("Cleared all documents from vector store")

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
    """Get vector store statistics"""
    return {
        "total_documents": len(documents),
        "index_size": index.ntotal,
        "embedding_dimension": dimension,
        "model": "all-MiniLM-L6-v2"
    }

@app.post("/sync_from_docling")
async def sync_from_docling(docling_url: str = "http://docling_service:8000"):
    """Sync documents from Docling service (example integration)"""
    try:
        # This is a placeholder for actual document syncing
        # In a real implementation, you would fetch documents from Docling service
        # and add them to the vector store

        logger.info(f"Sync request from Docling service at {docling_url}")

        # Example: Add some sample documents
        sample_docs = [
            Document(
                id="sample_1",
                content="Carpentry is a skilled trade and a craft in which the primary work performed is the cutting, shaping and installation of building materials during the construction of buildings, ships, timber bridges, concrete formwork, etc.",
                metadata={"source": "carpentry_guide", "category": "trade"}
            ),
            Document(
                id="sample_2",
                content="Oak is a hardwood that is commonly used in furniture making, flooring, and construction. It is known for its strength, durability, and attractive grain patterns.",
                metadata={"source": "wood_guide", "category": "materials"}
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
        "service": "RAG MCP Service",
        "version": "1.0.0",
        "description": "Vector search service for MCP integration",
        "endpoints": {
            "health": "/health",
            "query": "/query",
            "add_documents": "/add_documents",
            "stats": "/stats",
            "clear": "/clear",
            "sync_from_docling": "/sync_from_docling"
        },
        "model": "all-MiniLM-L6-v2",
        "vector_dimension": dimension,
        "documents_count": len(documents)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)