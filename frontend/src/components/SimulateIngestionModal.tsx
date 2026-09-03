import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Loader2, Sparkles, FileText, Database, ArrowRight } from 'lucide-react';
import { BlockchainBlock } from '../types';

interface SimulateIngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBlockMinted: (newBlock: BlockchainBlock) => void;
}

export const SimulateIngestionModal: React.FC<SimulateIngestionModalProps> = ({
  isOpen,
  onClose,
  onBlockMinted,
}) => {
  const [docType, setDocType] = useState<'RESEARCH' | 'CADASTRAL'>('RESEARCH');
  const [docTitle, setDocTitle] = useState('Blockchain-Based Spatial Cadastre for Agro-Territorial Conflict Resolution');
  const [sourceAgency, setSourceAgency] = useState('Springer Nature / DILRMP Research Working Group');
  const [pubYear, setPubYear] = useState(2026);
  const [region, setRegion] = useState('Maharashtra - Pune District');

  const [step, setStep] = useState<'IDLE' | 'HASHING' | 'QUALIFYING' | 'CONSENSUS' | 'MINTED'>('IDLE');
  const [generatedHash, setGeneratedHash] = useState('');
  const [qualificationScore, setQualificationScore] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSimulate = () => {
    setStep('HASHING');
    setGeneratedHash('0xcalculating_sha256_entropy_seed...');

    // Step 1: Deterministic Hashing
    setTimeout(() => {
      const pseudoHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setGeneratedHash(pseudoHash);
      setStep('QUALIFYING');

      // Step 2: Qualification scoring
      setTimeout(() => {
        setQualificationScore(96.4);
        setStep('CONSENSUS');

        // Step 3: Byzantine consensus multi-sig
        setTimeout(() => {
          setStep('MINTED');

          const newBlock: BlockchainBlock = {
            blockNumber: 10483,
            blockHash: pseudoHash,
            previousHash: "0x8f3c72b109e4d58a62319c8fbe90234a11f28b4d96c9e01357bd193efac8831b",
            timestamp: "Just now (Live Consensus)",
            merkleRoot: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
            validator: "Enterprise Consensus Quorum (4/4 Validated)",
            transactionCount: 1,
            status: 'COMMITTED',
            recordType: docType === 'RESEARCH' ? 'RESEARCH_EVIDENCE' : 'CADASTRAL_AMENDMENT',
            payloadSummary: `${docType === 'RESEARCH' ? 'Evidence Ingestion' : 'Cadastral Resurvey'}: ${docTitle}`
          };

          onBlockMinted(newBlock);
        }, 1200);
      }, 1000);
    }, 900);
  };

  const handleReset = () => {
    setStep('IDLE');
    setGeneratedHash('');
    setQualificationScore(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        {/* Glow Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/50 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Ingest &amp; Cryptographically Anchor Evidence</h3>
              <p className="text-xs text-slate-400">Deterministic SHA-256 generation, automated AI qualification, and Byzantine ledger commitment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'IDLE' ? (
          /* Form Input */
          <div className="mt-5 space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Payload Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDocType('RESEARCH');
                    setDocTitle('Blockchain-Based Spatial Cadastre for Agro-Territorial Conflict Resolution');
                  }}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    docType === 'RESEARCH'
                      ? 'bg-blue-950/60 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="font-bold">Peer-Reviewed Research</div>
                    <div className="text-[10px] text-slate-400">IEEE, Springer, ScienceDirect</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDocType('CADASTRAL');
                    setDocTitle('NAKSHA Resurvey GeoJSON Amendment: Khasra 512/3-A, Haveli');
                  }}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    docType === 'CADASTRAL'
                      ? 'bg-blue-950/60 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Database className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="font-bold">Cadastral Deed / GeoJSON</div>
                    <div className="text-[10px] text-slate-400">DILRMP & Surveyor Records</div>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Title / Document Name</label>
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Source / Issuing Body</label>
                <input
                  type="text"
                  value={sourceAgency}
                  onChange={(e) => setSourceAgency(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Indian Territory</label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSimulate}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Run Ingestion & Mint Block #10483
              </button>
            </div>
          </div>
        ) : (
          /* Animated Ingestion Pipeline State */
          <div className="mt-6 space-y-5 text-xs">
            {/* Step Indicators */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
              <div className={`p-2 rounded-lg border ${step === 'HASHING' ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 animate-pulse' : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
                1. SHA-256 Hashing
              </div>
              <div className={`p-2 rounded-lg border ${step === 'QUALIFYING' ? 'border-blue-400 bg-blue-950/60 text-blue-300 animate-pulse' : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
                2. AI Qualification
              </div>
              <div className={`p-2 rounded-lg border ${step === 'CONSENSUS' ? 'border-amber-400 bg-amber-950/60 text-amber-300 animate-pulse' : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
                3. DPoS Consensus
              </div>
              <div className={`p-2 rounded-lg border ${step === 'MINTED' ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300' : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
                4. Block Committed
              </div>
            </div>

            {/* Dynamic Status Display */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                {step === 'MINTED' ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                ) : (
                  <Loader2 className="w-7 h-7 text-cyan-400 animate-spin shrink-0" />
                )}
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {step === 'HASHING' && 'Computing Cryptographic Hash Digest...'}
                    {step === 'QUALIFYING' && 'Evaluating Evidence Freshness & Regional Applicability...'}
                    {step === 'CONSENSUS' && 'Gathering Quorum Signatures across Government Nodes...'}
                    {step === 'MINTED' && 'Success: Immutably Anchored in Block #10483!'}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {step === 'MINTED'
                      ? 'Record is now permanently verifiable across NIC, MeitY, and DILRMP validator nodes.'
                      : 'Executing Byzantine fault-tolerant consensus pipeline...'}
                  </p>
                </div>
              </div>

              {/* Hash Display */}
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-mono block mb-1">Generated Digest</span>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-[11px] break-all select-all">
                  {generatedHash}
                </div>
              </div>

              {/* Qualification Display */}
              {qualificationScore && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Freshness</span>
                    <span className="font-mono text-emerald-400 font-bold text-xs">99.0%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Geo-Relevance</span>
                    <span className="font-mono text-cyan-400 font-bold text-xs">95.2%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Overall Score</span>
                    <span className="font-mono text-blue-400 font-bold text-xs">{qualificationScore}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            {step === 'MINTED' && (
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Ingest Another Record
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  View in Blockchain Explorer &rarr;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
