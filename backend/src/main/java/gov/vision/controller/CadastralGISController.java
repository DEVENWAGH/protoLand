package gov.vision.controller;

import gov.vision.model.LandParcelEntity;
import gov.vision.repository.LandParcelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/gis")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CadastralGISController {

    private final LandParcelRepository parcelRepository;

    @GetMapping("/parcels")
    public ResponseEntity<List<LandParcelEntity>> getParcels(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) LandParcelEntity.DisputeStatus disputeStatus) {
        
        if (disputeStatus != null) {
            return ResponseEntity.ok(parcelRepository.findByDisputeStatus(disputeStatus));
        }
        if (district != null && state != null) {
            return ResponseEntity.ok(parcelRepository.findByDistrictAndState(district, state));
        }
        return ResponseEntity.ok(parcelRepository.findAll());
    }

    @GetMapping("/parcels/{khasraNumber}")
    public ResponseEntity<?> getParcelByKhasra(@PathVariable String khasraNumber) {
        return parcelRepository.findByKhasraNumber(khasraNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
