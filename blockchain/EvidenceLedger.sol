// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title EvidenceLedger
 * @dev National Digital Platform for Evidence-Based Land Governance - SIH 2026 (PS 26019)
 * Stores cryptographic hashes of peer-reviewed research papers, cadastral survey amendments, and policy gazettes.
 */
contract EvidenceLedger {
    address public centerAuthority;

    enum RecordType { RESEARCH_EVIDENCE, CADASTRAL_AMENDMENT, POLICY_GAZETTE }

    struct EvidenceRecord {
        bytes32 sha256Hash;
        RecordType recordType;
        string referenceUri;
        uint256 blockTimestamp;
        address validator;
        bool exists;
    }

    mapping(bytes32 => EvidenceRecord) public evidenceRegistry;
    bytes32[] public allEvidenceHashes;

    event EvidenceCommitted(
        bytes32 indexed sha256Hash,
        RecordType indexed recordType,
        address indexed validator,
        uint256 timestamp
    );

    modifier onlyAuthority() {
        require(msg.sender == centerAuthority, "Unauthorized: Only designated government validator node can commit");
        _;
    }

    constructor() {
        centerAuthority = msg.sender;
    }

    function commitEvidence(
        bytes32 _sha256Hash,
        RecordType _recordType,
        string calldata _referenceUri
    ) external onlyAuthority {
        require(!evidenceRegistry[_sha256Hash].exists, "Record already immutably anchored in ledger");

        evidenceRegistry[_sha256Hash] = EvidenceRecord({
            sha256Hash: _sha256Hash,
            recordType: _recordType,
            referenceUri: _referenceUri,
            blockTimestamp: block.timestamp,
            validator: msg.sender,
            exists: true
        });

        allEvidenceHashes.push(_sha256Hash);

        emit EvidenceCommitted(_sha256Hash, _recordType, msg.sender, block.timestamp);
    }

    function verifyEvidence(bytes32 _sha256Hash) external view returns (
        bool isVerified,
        RecordType recordType,
        uint256 blockTimestamp,
        address validator
    ) {
        EvidenceRecord memory record = evidenceRegistry[_sha256Hash];
        return (record.exists, record.recordType, record.blockTimestamp, record.validator);
    }

    function getTotalCommittedCount() external view returns (uint256) {
        return allEvidenceHashes.length;
    }
}
