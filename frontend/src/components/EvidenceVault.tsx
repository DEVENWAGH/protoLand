import React, { useState } from 'react';
import { ResearchEvidence } from '../types';
import { Database, Search, Filter, ShieldCheck, Download, ExternalLink, Copy, Check, Sliders, CheckCircle2 } from 'lucide-react';

interface EvidenceVaultProps {
  evidences: ResearchEvidence[];
  onNavigateToLedger: (hash: string) => void;
}

export const EvidenceVault: React.FC<EvidenceVaultProps> = ({ evidences, onNavigateToLedger }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('ALL');
  const [selectedEvidence, setSelectedEvidence] = useState<ResearchEvidence>(evidences[0]);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const filtered = evidences.filter(e => {
    const matchesQuery = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         e.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         e.hash.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = selectedSource === 'ALL' || e.source.toLowerCase().includes(selectedSource.toLowerCase());
    return matchesQuery && matchesSource;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter & Action Bar */}
      <div className="p-5 rounded-2xl glass-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            Evidence &amp; Empirical Research Vault
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Peer-reviewed cadastre studies, spatial datasets, and legal precedents anchored with cryptographic provenance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Source Filter */}
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="ALL">All Sources ({evidences.length})</option>
            <option value="IEEE">IEEE Transactions &amp; Access</option>
            <option value="Springer">Springer Geo-Systems</option>
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search evidence records..."
              className="bg-slate-900 border border-slate-700 text-white rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-cyan-400 w-64"
            />
          </div>
        </div>
      </div>

      {/* Main SaaS Layout: Data Table (8 cols) + Selected Record Inspector (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table View (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl glass-panel border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Evidence ID</th>
                  <th className="py-3.5 px-4">Title &amp; Source</th>
                  <th className="py-3.5 px-4">Qualification</th>
                  <th className="py-3.5 px-4">Block #</th>
                  <th className="py-3.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((item) => {
                  const isSelected = selectedEvidence.id === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedEvidence(item)}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-950/40 text-white'
                          : 'hover:bg-slate-800/30 text-slate-300'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono text-cyan-400 font-semibold whitespace-nowrap">
                        {item.id}
                      </td>
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="font-semibold text-white truncate">{item.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.source} • {item.publicationYear}</div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {item.qualificationScore.overall}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                        #{item.blockNumber}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                          {item.verificationStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Evidence Detail Drawer (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-4 shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[10px] font-mono text-cyan-400 uppercase">Selected Evidence Dossier</span>
              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px] font-mono border border-blue-800">
                Block #{selectedEvidence.blockNumber}
              </span>
            </div>

            <h3 className="mt-3 text-sm font-bold text-white leading-snug">
              {selectedEvidence.title}
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Authors: {selectedEvidence.authors.join(', ')}
            </p>

            {/* Score Breakdown */}
            <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                Evidence Qualification Breakdown
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Freshness</span>
                  <span className="font-mono text-emerald-400 font-bold">{selectedEvidence.qualificationScore.freshness}%</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Geo-Fit</span>
                  <span className="font-mono text-cyan-400 font-bold">{selectedEvidence.qualificationScore.geoRelevance}%</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Source</span>
                  <span className="font-mono text-blue-400 font-bold">{selectedEvidence.qualificationScore.sourceConsistency}%</span>
                </div>
              </div>
            </div>

            {/* Abstract */}
            <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong className="text-white block mb-1">Abstract Summary:</strong>
              {selectedEvidence.abstract}
            </div>

            {/* Hash Chip */}
            <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                <span>Cryptographic SHA-256</span>
                <button
                  onClick={() => handleCopy(selectedEvidence.hash)}
                  className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedHash === selectedEvidence.hash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedHash === selectedEvidence.hash ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="text-[11px] text-cyan-300 break-all select-all">
                {selectedEvidence.hash}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => onNavigateToLedger(selectedEvidence.hash)}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Verify on Blockchain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
