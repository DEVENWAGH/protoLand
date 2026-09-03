export interface BlockchainBlock {
  blockNumber: number;
  blockHash: string;
  previousHash: string;
  timestamp: string;
  merkleRoot: string;
  validator: string;
  transactionCount: number;
  status: 'COMMITTED' | 'VALIDATING';
  recordType: 'RESEARCH_EVIDENCE' | 'CADASTRAL_AMENDMENT' | 'REGULATORY_RECORD';
  payloadSummary: string;
}

export interface ResearchEvidence {
  id: string;
  title: string;
  authors: string[];
  publicationYear: number;
  source: string;
  doiOrRef: string;
  hash: string;
  blockNumber: number;
  qualificationScore: {
    overall: number; // 0-100
    freshness: number; // 0-100
    geoRelevance: number; // 0-100
    sourceConsistency: number; // 0-100
  };
  applicabilityRegion: string;
  cadastralRelevanceTag: string;
  abstract: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'FLAGGED';
}

export interface LandParcel {
  parcelId: string;
  khasraNo: string;
  district: string;
  state: string;
  areaHectares: number;
  landUseCategory: 'Agricultural' | 'Commercial' | 'Forest/Ecological' | 'Residential' | 'Industrial';
  disputeStatus: 'CLEAR' | 'UNDER_APPEAL' | 'ENCROACHMENT_RISK';
  lastAuditDate: string;
  blockchainHash: string;
  ownerProvenanceCount: number;
  currentOwner: string;
  coordinates: [number, number][]; // Polygon coords [lat, lng]
  marketValuationCr: number;
}

export interface RegulatoryRecord {
  id: string;
  code: string;
  title: string;
  authority: string;
  effectiveDate: string;
  targetObjective: string;
  evidenceBacked: boolean;
  linkedEvidenceCount: number;
  complianceStatus: 'COMPLIANT' | 'GAP_DETECTED' | 'REVIEW_PENDING';
  gapDetails?: string;
}
