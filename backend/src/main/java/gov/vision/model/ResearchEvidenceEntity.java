package gov.vision.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "research_evidence", indexes = {
    @Index(name = "idx_evidence_hash", columnList = "sha256Hash", unique = true),
    @Index(name = "idx_evidence_block", columnList = "committedBlockNumber")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResearchEvidenceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String evidenceCode;

    @Column(nullable = false, length = 512)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String abstractText;

    private String primarySource; // e.g. IEEE Access, Springer

    private Integer publicationYear;

    @Column(nullable = false, length = 66)
    private String sha256Hash; // Immutable cryptographic commitment

    private Long committedBlockNumber;

    private Double qualificationScore; // Aggregate 0.0 - 100.0

    private Double freshnessScore;

    private Double geoApplicabilityScore;

    private Double sourceConsistencyScore;

    private String targetRegion;

    private String linkedPolicyId;

    @Builder.Default
    private Instant registeredAt = Instant.now();
}
