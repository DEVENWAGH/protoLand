import React, { useState } from 'react';
import { RegulatoryRecord } from '../types';
import { FileCheck2, AlertCircle, CheckCircle2, Search, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface ComplianceMatrixProps {
  records: RegulatoryRecord[];
  onOpenCopilot: () => void;
}

export const ComplianceMatrix: React.FC<ComplianceMatrixProps> = ({ records, onOpenCopilot }) => {
  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<RegulatoryRecord>(records[1]);

  const filtered = records.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.code.toLowerCase().includes(search.toLowerCase()) ||
    r.authority.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl glass-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-cyan-400" />
            Statutory Cadastral Standards &amp; Compliance Gap Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-references cadastral regulations with peer-reviewed empirical evidence to detect scientific and data deficits.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search regulations &amp; standards..."
            className="bg-slate-900 border border-slate-700 text-white rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-cyan-400 w-64"
          />
        </div>
      </div>

      {/* Grid of Standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filtered.map((record) => {
          const isGap = record.complianceStatus === 'GAP_DETECTED';
          return (
            <div
              key={record.id}
              onClick={() => setSelectedRecord(record)}
              className={`p-5 rounded-2xl glass-panel border cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between space-y-4 shadow-xl ${
                selectedRecord.id === record.id
                  ? 'border-cyan-400/80 bg-blue-950/30 ring-1 ring-cyan-500/30'
                  : isGap
                  ? 'border-amber-500/40 hover:border-amber-400'
                  : 'border-emerald-500/30 hover:border-emerald-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {record.code}
                  </span>
                  {isGap ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Evidence Deficit
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 100% Backed
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-sm font-bold text-white leading-snug">{record.title}</h3>
                <p className="mt-1 text-xs text-slate-400">{record.authority}</p>

                <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-white block mb-0.5 text-[11px] uppercase font-mono text-slate-400">Target Standard Objective:</strong>
                  {record.targetObjective}
                </div>

                {record.gapDetails && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-950/30 border border-amber-800/50 text-xs text-amber-300 space-y-1">
                    <strong className="text-amber-200 block text-[11px] uppercase font-mono flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      Detected Empirical Deficit
                    </strong>
                    <p className="leading-relaxed">{record.gapDetails}</p>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  {record.linkedEvidenceCount} Linked Research Studies
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCopilot();
                  }}
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  Draft Remediation &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
