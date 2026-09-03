package gov.vision.controller;

import gov.vision.model.ResearchEvidenceEntity;
import gov.vision.repository.ResearchEvidenceRepository;
import gov.vision.service.BlockchainProvenanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ledger")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EvidenceLedgerController {

    private final ResearchEvidenceRepository evidenceRepository;
    private final BlockchainProvenanceService provenanceService;

    @GetMapping("/evidences")
    public ResponseEntity<List<ResearchEvidenceEntity>> getAllEvidences(
            @RequestParam(required = false) Double minScore) {
        if (minScore != null) {
            return ResponseEntity.ok(evidenceRepository.findByQualificationScoreGreaterThanEqual(minScore));
        }
        return ResponseEntity.ok(evidenceRepository.findAll());
    }

    @GetMapping("/verify/{hash}")
    public ResponseEntity<?> verifyHash(@PathVariable String hash) {
        return evidenceRepository.findBySha256Hash(hash.toLowerCase())
                .map(evidence -> ResponseEntity.ok(Map.of(
                        "verified", true,
                        "blockNumber", evidence.getCommittedBlockNumber(),
                        "title", evidence.getTitle(),
                        "score", evidence.getQualificationScore(),
                        "timestamp", evidence.getRegisteredAt()
                )))
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of(
                        "verified", false,
                        "message", "Hash record not found in committed ledger state"
                )));
    }
}
