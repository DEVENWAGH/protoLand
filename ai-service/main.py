from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from qualification.scoring import EvidenceQualificationEngine
from rag.vector_search import MockVectorSearchEngine

app = FastAPI(
    title="VISION AI Research & Policy Intelligence API",
    description="Vector search, RAG policy synthesis, and multi-factor evidence qualification for SIH 2026 PS 26019.",
    version="1.0.0"
)

vector_engine = MockVectorSearchEngine()

class QualificationRequest(BaseModel):
    title: str
    publication_year: int
    source: str
    target_region: str
    applied_state: Optional[str] = "Maharashtra"

class SemanticSearchQuery(BaseModel):
    query: str
    top_k: Optional[int] = 3

@app.get("/")
def health_check():
    return {
        "service": "VISION AI RAG & Qualification Engine",
        "status": "ONLINE",
        "model": "all-MiniLM-L6-v2 + LangChain Vector RAG"
    }

@app.post("/api/v1/qualification/score")
def qualify_evidence(req: QualificationRequest):
    result = EvidenceQualificationEngine.evaluate(
        pub_year=req.publication_year,
        source=req.source,
        target_region=req.target_region,
        applied_state=req.applied_state
    )
    return {
        "title": req.title,
        "evaluation": result
    }

@app.post("/api/v1/rag/search")
def semantic_search(query_payload: SemanticSearchQuery):
    results = vector_engine.query(query_payload.query, top_k=query_payload.top_k)
    return {
        "query": query_payload.query,
        "total_matches": len(results),
        "results": results
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
