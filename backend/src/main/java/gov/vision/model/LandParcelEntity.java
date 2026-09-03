package gov.vision.model;

import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Polygon;

import java.time.LocalDate;

@Entity
@Table(name = "land_parcels", indexes = {
    @Index(name = "idx_parcel_khasra", columnList = "khasraNumber"),
    @Index(name = "idx_parcel_hash", columnList = "cadastralHash")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LandParcelEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String parcelCode;

    @Column(nullable = false)
    private String khasraNumber;

    private String district;

    private String state;

    private Double areaHectares;

    @Enumerated(EnumType.STRING)
    private LandUseType landUse;

    @Enumerated(EnumType.STRING)
    private DisputeStatus disputeStatus;

    @Column(columnDefinition = "geometry(Polygon, 4326)")
    private Polygon geom; // PostGIS Spatial Boundary Polygon

    @Column(nullable = false, length = 66)
    private String cadastralHash;

    private Integer provenanceTransferCount;

    private LocalDate lastSurveyAuditDate;

    public enum LandUseType {
        AGRICULTURAL, COMMERCIAL, RESIDENTIAL, FOREST_ECOLOGICAL, INDUSTRIAL
    }

    public enum DisputeStatus {
        CLEAR, UNDER_APPEAL, ENCROACHMENT_RISK
    }
}
