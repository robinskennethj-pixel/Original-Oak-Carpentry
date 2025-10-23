from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from docling.document_converter import DocumentConverter
from pydantic import BaseModel
from typing import Optional
import tempfile
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Docling MCP Service", version="1.0.0")

# Initialize Docling converter
converter = DocumentConverter()

class ParseResponse(BaseModel):
    text: str
    metadata: dict
    status: str

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint for MCP monitoring"""
    return HealthResponse(
        status="healthy",
        service="docling-mcp-service",
        version="1.0.0"
    )

@app.post("/parse", response_model=ParseResponse)
async def parse_document(file: UploadFile = File(...)):
    """Parse uploaded document using Docling"""
    try:
        # Validate file type
        allowed_extensions = {'.pdf', '.docx', '.doc', '.txt', '.md', '.html'}
        file_ext = os.path.splitext(file.filename)[1].lower()

        if file_ext not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type: {file_ext}. Allowed: {allowed_extensions}"
            )

        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as tmp_file:
            content = await file.read()
            tmp_file.write(content)
            tmp_path = tmp_file.name

        try:
            # Convert document using Docling
            logger.info(f"Parsing document: {file.filename}")
            result = converter.convert(tmp_path)

            # Extract text and metadata
            text = result.document.export_to_markdown()
            metadata = {
                "filename": file.filename,
                "file_size": len(content),
                "file_type": file_ext,
                "pages": len(result.document.pages) if hasattr(result.document, 'pages') else 1,
                "parsed_at": result.document.origin.creation_date if hasattr(result.document.origin, 'creation_date') else None
            }

            logger.info(f"Successfully parsed document: {file.filename}")

            return ParseResponse(
                text=text,
                metadata=metadata,
                status="success"
            )

        finally:
            # Clean up temporary file
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error parsing document {file.filename}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error parsing document: {str(e)}")

@app.post("/parse-url")
async def parse_document_url(url: str):
    """Parse document from URL"""
    try:
        logger.info(f"Parsing document from URL: {url}")
        result = converter.convert(url)

        # Extract text and metadata
        text = result.document.export_to_markdown()
        metadata = {
            "source_url": url,
            "pages": len(result.document.pages) if hasattr(result.document, 'pages') else 1,
            "parsed_at": result.document.origin.creation_date if hasattr(result.document.origin, 'creation_date') else None
        }

        logger.info(f"Successfully parsed document from URL: {url}")

        return ParseResponse(
            text=text,
            metadata=metadata,
            status="success"
        )

    except Exception as e:
        logger.error(f"Error parsing URL {url}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error parsing URL: {str(e)}")

@app.get("/")
async def root():
    """Root endpoint with service information"""
    return {
        "service": "Docling MCP Service",
        "version": "1.0.0",
        "description": "Document parsing service for MCP integration",
        "endpoints": {
            "health": "/health",
            "parse": "/parse",
            "parse_url": "/parse-url"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)