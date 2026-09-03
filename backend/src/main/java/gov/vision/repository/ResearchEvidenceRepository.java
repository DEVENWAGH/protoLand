package gov.vision.repository;

import gov.vision.model.ResearchEvidenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResearchEvidenceRepository extends JpaRepository<ResearchEvidenceEntity, Long> {
    Optional<ResearchEvidenceEntity> findBySha256Hash(String sha256Hash);
    Optional<ResearchEvidenceEntity> findByEvidenceCode(String evidenceCode);
    List<ResearchEvidenceEntity> findByLinkedPolicyId(String linkedPolicyId);
    List<ResearchEvidenceEntity> findByQualificationScoreGreaterThanEqual(Double minScore);
}
