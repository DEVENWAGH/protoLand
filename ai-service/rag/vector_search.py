from typing import List, Dict, Any

class MockVectorSearchEngine:
    """
    Simulates pgvector / LangChain RAG vector similarity search
    over indexed land governance research abstracts.
    """

    def __init__(self):
        self.corpus = [
            {
                "id": "REV-2026-001",
                "title": "Multi-Tier Blockchain-Based Land Registry Using Fog Computing",
                "content": "Fog computing latency reduction Byzantine fault tolerance distributed land registry DPoS smart contract",
                "block_number": 10482
            },
            {
                "id": "REV-2026-002",
                "title": "AI in Agricultural Cadastre: Transforming Agro-Territorial Management for Sustainability",
                "content": "Agricultural land divergence soil degradation LULC multi-spectral satellite imagery cadastral compliance",
                "block_number": 10479
            },
            {
                "id": "REV-2026-003",
                "title": "Blockchain Framework for Cadastral Systems in Conflict-Impacted Communities",
                "content": "Boundary disputes multi-signature consensus surveyor GeoTIFF marks post-disaster land grabbing prevention",
                "block_number": 10476
            }
        ]

    def query(self, query_text: str, top_k: int = 2) -> List<Dict[str, Any]]:
        tokens = set(query_text.lower().split())
        scored_results = []

        for doc in self.corpus:
            doc_tokens = set(doc["content"].lower().split())
            overlap = len(tokens.intersection(doc_tokens))
            similarity = round(min(0.99, 0.65 + (overlap * 0.1)), 2)
            scored_results.append({**doc, "similarity_score": similarity})

        scored_results.sort(key=lambda x: x["similarity_score"], reverse=True)
        return scored_results[:top_k]
