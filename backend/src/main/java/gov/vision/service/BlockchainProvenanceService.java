package gov.vision.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
@Slf4j
public class BlockchainProvenanceService {

    /**
     * Computes deterministic SHA-256 hash for raw evidence or Cadastral GeoJSON bytes
     */
    public String computeSha256(byte[] data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(data);
            StringBuilder hexString = new StringBuilder("0x");
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm missing from JVM", e);
        }
    }

    /**
     * Verifies whether a submitted document matches the stored blockchain hash
     */
    public boolean verifyIntegrity(byte[] documentBytes, String expectedHash) {
        String calculated = computeSha256(documentBytes);
        return calculated.equalsIgnoreCase(expectedHash);
    }
}
