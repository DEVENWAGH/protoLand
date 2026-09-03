from datetime import datetime

class EvidenceQualificationEngine:
    """
    Computes multi-factor qualification metrics for peer-reviewed papers & cadastral datasets:
    1. Freshness Score (exponential decay based on year of publication)
    2. Geo-Applicability Score (matching target Indian agro-climatic & state cadastre rules)
    3. Source Authority Score (impact factor, peer-review classification: IEEE, Springer, GoI gazette)
    """

    TRUSTED_SOURCES_WEIGHT = {
        "IEEE Access": 96.0,
        "Springer": 92.0,
        "Elsevier Land Use Policy": 95.0,
        "NIC Property Chain": 98.0,
        "DILRMP Gazette": 99.0,
        "Unknown": 70.0
    }

    @staticmethod
    def calculate_freshness(pub_year: int) -> float:
        current_year = 2026
        age = max(0, current_year - pub_year)
        # Retain high score for 0-3 years, slight decay afterwards
        score = max(50.0, 100.0 - (age * 3.5))
        return round(score, 1)

    @classmethod
    def calculate_source_authority(cls, source_name: str) -> float:
        for key, weight in cls.TRUSTED_SOURCES_WEIGHT.items():
            if key.lower() in source_name.lower():
                return weight
        return cls.TRUSTED_SOURCES_WEIGHT["Unknown"]

    @staticmethod
    def calculate_geo_applicability(target_region: str, applied_state: str) -> float:
        if "pan-india" in target_region.lower() or applied_state.lower() in target_region.lower():
            return 95.0
        return 80.0

    @classmethod
    def evaluate(cls, pub_year: int, source: str, target_region: str, applied_state: str = "Maharashtra") -> dict:
        freshness = cls.calculate_freshness(pub_year)
        source_auth = cls.calculate_source_authority(source)
        geo_rel = cls.calculate_geo_applicability(target_region, applied_state)

        # Weighted aggregate score
        overall = round((freshness * 0.35) + (geo_rel * 0.35) + (source_auth * 0.30), 1)

        return {
            "overall_score": overall,
            "freshness": freshness,
            "geo_relevance": geo_rel,
            "source_authority": source_auth,
            "is_qualified": overall >= 75.0
        }
