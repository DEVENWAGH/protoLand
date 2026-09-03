package gov.vision.repository;

import gov.vision.model.LandParcelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LandParcelRepository extends JpaRepository<LandParcelEntity, Long> {
    Optional<LandParcelEntity> findByParcelCode(String parcelCode);
    Optional<LandParcelEntity> findByKhasraNumber(String khasraNumber);
    List<LandParcelEntity> findByDistrictAndState(String district, String state);
    List<LandParcelEntity> findByDisputeStatus(LandParcelEntity.DisputeStatus disputeStatus);

    @Query(value = "SELECT * FROM land_parcels WHERE ST_Intersects(geom, ST_MakeEnvelope(:minX, :minY, :maxX, :maxY, 4326))", nativeQuery = true)
    List<LandParcelEntity> findWithinBBox(
        @Param("minX") double minX,
        @Param("minY") double minY,
        @Param("maxX") double maxX,
        @Param("maxY") double maxY
    );
}
