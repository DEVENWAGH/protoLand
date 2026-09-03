import { BlockchainBlock, ResearchEvidence, LandParcel, RegulatoryRecord } from '../types';

export interface ValidatorNode {
  id: string;
  name: string;
  region: string;
  tier: string;
  status: 'ONLINE' | 'SYNCING';
  latencyMs: number;
  blocksValidated: number;
  uptime: string;
  endpoint: string;
}

export const mockValidatorNodes: ValidatorNode[] = [
  {
    id: "NODE-VAL-01",
    name: "Enterprise Node Alpha",
    region: "West Zone (Mumbai / Pune)",
    tier: "Primary Consensus Validator",
    status: "ONLINE",
    latencyMs: 14,
    blocksValidated: 4210,
    uptime: "99.99%",
    endpoint: "node-west-01.vision.network:8545"
  },
  {
    id: "NODE-VAL-02",
    name: "Federal Hub Validator",
    region: "Central Zone (New Delhi)",
    tier: "Consensus Anchor",
    status: "ONLINE",
    latencyMs: 21,
    blocksValidated: 3180,
    uptime: "100.00%",
    endpoint: "node-central-02.vision.network:8545"
  },
  {
    id: "NODE-VAL-03",
    name: "Cadastral Oracle Node",
    region: "South Zone (Bengaluru)",
    tier: "Spatial Data Oracle",
    status: "ONLINE",
    latencyMs: 12,
    blocksValidated: 1984,
    uptime: "99.96%",
    endpoint: "node-south-03.vision.network:8545"
  },
  {
    id: "NODE-VAL-04",
    name: "Registry Witness Node",
    region: "East Zone (Kolkata)",
    tier: "Ledger Witness",
    status: "ONLINE",
    latencyMs: 18,
    blocksValidated: 1108,
    uptime: "99.98%",
    endpoint: "node-east-04.vision.network:8545"
  }
];

export const mockBlocks: BlockchainBlock[] = [
  {
    blockNumber: 10482,
    blockHash: "0x8f3c72b109e4d58a62319c8fbe90234a11f28b4d96c9e01357bd193efac8831b",
    previousHash: "0x3a4b912c984fd729e81b67f4019e2bc8a7605d33f5d68019e64c204918e77890",
    timestamp: "2026-03-02 23:45:12 IST",
    merkleRoot: "0x98f41e09dc88764a51e6005b6fae6396f4c7e63b38148b52f144d47c43df4191",
    validator: "Enterprise Node Alpha",
    transactionCount: 8,
    status: 'COMMITTED',
    recordType: 'RESEARCH_EVIDENCE',
    payloadSummary: "Evidence Anchor: Multi-Tier Blockchain Cadastre Study (IEEE Access)"
  },
  {
    blockNumber: 10481,
    blockHash: "0x3a4b912c984fd729e81b67f4019e2bc8a7605d33f5d68019e64c204918e77890",
    previousHash: "0x77c29304ffb6732598327cb09923184659b8d23485fa6b3017a419515632ebca",
    timestamp: "2026-03-02 23:38:04 IST",
    merkleRoot: "0x44c12563f47e23b185bc732943e82b7991ca9f83fbc3047214e91048ca0945de",
    validator: "Cadastral Oracle Node",
    transactionCount: 14,
    status: 'COMMITTED',
    recordType: 'CADASTRAL_AMENDMENT',
    payloadSummary: "Cadastral GeoJSON Boundary Re-survey: Khasra 482/1-B"
  },
  {
    blockNumber: 10480,
    blockHash: "0x77c29304ffb6732598327cb09923184659b8d23485fa6b3017a419515632ebca",
    previousHash: "0x21bb493018274acde7428135891398246182c8423450912461935817aed093f1",
    timestamp: "2026-03-02 23:15:30 IST",
    merkleRoot: "0x12b037283624890c401349580bbf4823a49182390a8235760812347bcadae382",
    validator: "Federal Hub Validator",
    transactionCount: 5,
    status: 'COMMITTED',
    recordType: 'REGULATORY_RECORD',
    payloadSummary: "Compliance Baseline: Agro-Territorial Cadastral Guideline 2026"
  }
];

export const mockEvidences: ResearchEvidence[] = [
  {
    id: "EVD-2026-001",
    title: "Multi-Tier Blockchain Architecture for Low-Latency Land Registries",
    authors: ["S. Sharma", "A. K. Verma", "R. Swaminathan"],
    publicationYear: 2025,
    source: "IEEE Access",
    doiOrRef: "10.1109/ACCESS.2025.3382910",
    hash: "0x8f3c72b109e4d58a62319c8fbe90234a11f28b4d96c9e01357bd193efac8831b",
    blockNumber: 10482,
    qualificationScore: {
      overall: 94,
      freshness: 98,
      geoRelevance: 92,
      sourceConsistency: 96
    },
    applicabilityRegion: "Pan-India / Semi-Urban Cadastres",
    cadastralRelevanceTag: "Latency Optimization & Concurrency",
    verificationStatus: 'VERIFIED',
    abstract: "Proposes a decentralized edge computing architecture for land parcel registries, reducing transaction verification latency to under 300ms while maintaining Byzantine fault tolerance across distributed validation nodes."
  },
  {
    id: "EVD-2026-002",
    title: "AI & Multi-Spectral Satellite Synthesis for Land-Use Divergence Detection",
    authors: ["M. E. Rodriguez", "K. Patel", "L. Chen"],
    publicationYear: 2026,
    source: "Springer Geo-Environmental Systems",
    doiOrRef: "10.1007/s42452-026-08122-x",
    hash: "0x55a91824701239841cbef4801934ba723490812aedbc3091724890bc41235617",
    blockNumber: 10479,
    qualificationScore: {
      overall: 91,
      freshness: 99,
      geoRelevance: 88,
      sourceConsistency: 93
    },
    applicabilityRegion: "Maharashtra, Karnataka, MP",
    cadastralRelevanceTag: "LULC Change Detection",
    verificationStatus: 'VERIFIED',
    abstract: "Synthesizes multi-spectral satellite imagery and cadastral maps to detect agricultural land divergence, soil degradation risks, and unauthorized non-agricultural conversions in real time."
  },
  {
    id: "EVD-2026-003",
    title: "Cryptographic Consensus Framework for High-Conflict Cadastral Boundaries",
    authors: ["H. Al-Mutawa", "D. Kumar"],
    publicationYear: 2025,
    source: "Springer Spatial Sciences",
    doiOrRef: "10.1007/978-3-031-72911-3_8",
    hash: "0x11e409127834bc981240aed7410293847aefbc09283412957193482319082341",
    blockNumber: 10476,
    qualificationScore: {
      overall: 87,
      freshness: 94,
      geoRelevance: 82,
      sourceConsistency: 90
    },
    applicabilityRegion: "Border Districts & Disputed Zones",
    cadastralRelevanceTag: "Boundary Dispute Resolution",
    verificationStatus: 'VERIFIED',
    abstract: "Presents a multi-signature consensus model linking cadastral surveyor GeoTIFF boundary marks directly with immutable witness signatures to prevent post-disaster land record alterations."
  },
  {
    id: "EVD-2026-004",
    title: "High-Throughput DPoS Consensus in National Scale Property Registries",
    authors: ["N. T. Islam", "F. R. Chowdhury", "M. S. Rahman"],
    publicationYear: 2025,
    source: "IEEE Transactions on Computational Social Systems",
    doiOrRef: "10.1109/TCSS.2025.3219401",
    hash: "0x44c12563f47e23b185bc732943e82b7991ca9f83fbc3047214e91048ca0945de",
    blockNumber: 10470,
    qualificationScore: {
      overall: 93,
      freshness: 96,
      geoRelevance: 91,
      sourceConsistency: 94
    },
    applicabilityRegion: "Pan-India / South Asia",
    cadastralRelevanceTag: "Throughput & Security",
    verificationStatus: 'VERIFIED',
    abstract: "Demonstrates that DPoS consensus achieves 3,500 TPS for institutional land registration while consuming 99.8% less energy than Proof-of-Work, ensuring tamper-evident state transitions."
  }
];

export const mockParcels: LandParcel[] = [
  {
    parcelId: "PARCEL-MH-PUN-0912",
    khasraNo: "482/1-B",
    district: "Pune",
    state: "Maharashtra",
    areaHectares: 3.42,
    landUseCategory: "Agricultural",
    disputeStatus: "CLEAR",
    lastAuditDate: "2026-02-28",
    blockchainHash: "0x3a4b912c984fd729e81b67f4019e2bc8a7605d33f5d68019e64c204918e77890",
    ownerProvenanceCount: 3,
    currentOwner: "Kulkarni Agro Holdings Ltd.",
    marketValuationCr: 8.45,
    coordinates: [
      [18.5204, 73.8567],
      [18.5240, 73.8590],
      [18.5225, 73.8640],
      [18.5185, 73.8610],
      [18.5204, 73.8567]
    ]
  },
  {
    parcelId: "PARCEL-MH-PUN-0913",
    khasraNo: "482/2",
    district: "Pune",
    state: "Maharashtra",
    areaHectares: 1.85,
    landUseCategory: "Commercial",
    disputeStatus: "UNDER_APPEAL",
    lastAuditDate: "2026-01-15",
    blockchainHash: "0x67a192834190872346123498acbef12490182358901234751934871923485712",
    ownerProvenanceCount: 5,
    currentOwner: "Apex Infrastructure Partners",
    marketValuationCr: 14.20,
    coordinates: [
      [18.5245, 73.8595],
      [18.5280, 73.8615],
      [18.5265, 73.8665],
      [18.5228, 73.8645],
      [18.5245, 73.8595]
    ]
  },
  {
    parcelId: "PARCEL-MH-HAV-1104",
    khasraNo: "108/3",
    district: "Haveli",
    state: "Maharashtra",
    areaHectares: 5.12,
    landUseCategory: "Forest/Ecological",
    disputeStatus: "ENCROACHMENT_RISK",
    lastAuditDate: "2026-02-10",
    blockchainHash: "0x98124aedf7192834910283571924618294612398412893571924619284719283",
    ownerProvenanceCount: 2,
    currentOwner: "State Forest Conservation Reserve",
    marketValuationCr: 21.00,
    coordinates: [
      [18.5140, 73.8500],
      [18.5175, 73.8535],
      [18.5150, 73.8580],
      [18.5110, 73.8540],
      [18.5140, 73.8500]
    ]
  },
  {
    parcelId: "PARCEL-MH-HAV-1108",
    khasraNo: "109/1",
    district: "Haveli",
    state: "Maharashtra",
    areaHectares: 2.10,
    landUseCategory: "Residential",
    disputeStatus: "CLEAR",
    lastAuditDate: "2026-03-01",
    blockchainHash: "0x55a91824701239841cbef4801934ba723490812aedbc3091724890bc41235617",
    ownerProvenanceCount: 4,
    currentOwner: "Sahyadri Estates & Township",
    marketValuationCr: 12.80,
    coordinates: [
      [18.5170, 73.8650],
      [18.5200, 73.8680],
      [18.5180, 73.8720],
      [18.5145, 73.8690],
      [18.5170, 73.8650]
    ]
  }
];

export const mockRegulatoryRecords: RegulatoryRecord[] = [
  {
    id: "REG-2026-01",
    code: "LAND-AUDIT-26",
    title: "Digital Cadastral Titling & Spatial Provenance Standard",
    authority: "Land Revenue & Survey Administration",
    effectiveDate: "2026-01-20",
    targetObjective: "Establish definitive digital title verification with cryptographic audit trails and spatial validation.",
    evidenceBacked: true,
    linkedEvidenceCount: 4,
    complianceStatus: 'COMPLIANT'
  },
  {
    id: "REG-2026-02",
    code: "AGRI-ZONE-25",
    title: "Agricultural Land Divergence & Environmental Protection Standard",
    authority: "Resource Conservation Directorate",
    effectiveDate: "2025-11-14",
    targetObjective: "Prevent unauthorized conversion of high-yield arable land into non-conforming industrial zones.",
    evidenceBacked: true,
    linkedEvidenceCount: 2,
    complianceStatus: 'GAP_DETECTED',
    gapDetails: "Standard lacks localized empirical telemetry correlation for peri-urban groundwater table drawdown."
  },
  {
    id: "REG-2026-03",
    code: "ECOLOGICAL-CFR-24",
    title: "Ecological Buffer & Forest Demarcation Directive",
    authority: "Environmental Compliance Board",
    effectiveDate: "2024-09-08",
    targetObjective: "Geo-tagging and tamper-evident spatial demarcation for protected community reserve boundaries.",
    evidenceBacked: true,
    linkedEvidenceCount: 1,
    complianceStatus: 'GAP_DETECTED',
    gapDetails: "Lacks cryptographic multi-witness signature verification during boundary resurvey audits."
  }
];
