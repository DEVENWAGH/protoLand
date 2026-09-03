import React from 'react';
import { Layers, ShieldCheck, Database, FileCheck2, ArrowUpRight, TrendingUp, AlertTriangle, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { BlockchainBlock, LandParcel, ResearchEvidence } from '../types';

interface AnalyticsOverviewProps {
  onNavigate: (tab: string) => void;
  blocks: BlockchainBlock[];
  parcels: LandParcel[];
  evidences: ResearchEvidence[];
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({
  onNavigate,
  blocks,
  parcels,
  evidences,
}) => {
  const totalValuation = parcels.reduce((sum, p) => sum + p.marketValuationCr, 0).toFixed(1);
  const clearParcelsCount = parcels.filter(p => p.disputeStatus === 'CLEAR').length;

  const kpis = [
    {
      title: 'Monitored Cadastral Parcels',
      value: parcels.length.toString(),
      subtext: `${clearParcelsCount} Conclusive Clear Titles`,
      icon: Layers,
      trend: '+100% Geocoded',
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Anchored Blockchain Blocks',
      value: blocks.length > 0 ? blocks[0].blockNumber.toLocaleString() : '10,482',
      subtext: '0x SHA-256 Merkle Provenance',
      icon: ShieldCheck,
      trend: 'Zero Tampering',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10'
    },
    {
      title: 'Qualified Evidence Papers',
      value: evidences.length.toString(),
      subtext: 'Avg. Qualification Score: 92.8%',
      icon: Database,
      trend: 'RAG Indexed',
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10'
    },
    {
      title: 'Portfolio Cadastral Valuation',
      value: `₹${totalValuation} Cr`,
      subtext: '4 High-Priority Zones',
      icon: TrendingUp,
      trend: 'Active Audit',
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl glass-panel border ${kpi.border} hover:border-cyan-400/50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{kpi.title}</span>
                <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-white">{kpi.value}</span>
                <span className="text-xs text-emerald-400 font-medium">{kpi.trend}</span>
              </div>
              <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>{kpi.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main SaaS Workspace Split: Studio Action Banners & Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Quick Access Commercial Feature Studios (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-cyan-950/70 border border-cyan-500/20 shadow-xl relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold inline-block mb-3">
                Commercial Enterprise Platform
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Decentralized Land Intelligence &amp; Cryptographic Provenance
              </h2>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Seamlessly unify cadastral spatial geometry, multi-spectral land-use change detection, and empirical evidence qualification into a single verifiable ecosystem.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <button
                  onClick={() => onNavigate('gis')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-cyan-300" />
                  Launch Map Studio
                </button>
                <button
                  onClick={() => onNavigate('ai-copilot')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Ask AI Land Copilot
                </button>
                <button
                  onClick={() => onNavigate('ledger')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Verify Hash Proof
                </button>
              </div>
            </div>
          </div>

          {/* Module Deep-Dive Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* GIS Card */}
            <div 
              onClick={() => onNavigate('gis')}
              className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all hover:scale-[1.01] group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-blue-950 text-blue-400 border border-blue-800">
                  <MapPin className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-white">Cadastral Map Studio</h3>
              <p className="mt-1 text-xs text-slate-400">
                Interactive spatial viewer with high-resolution satellite imagery, Khasra boundary polygons, and dispute detection.
              </p>
              <div className="mt-3 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <span>{parcels.length} Active Spatial Polygons</span> &rarr;
              </div>
            </div>

            {/* AI Copilot Card */}
            <div 
              onClick={() => onNavigate('ai-copilot')}
              className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all hover:scale-[1.01] group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
                  <Sparkles className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-white">AI Land Copilot</h3>
              <p className="mt-1 text-xs text-slate-400">
                Vector-retrieval synthesis over peer-reviewed cadastral papers, title laws, and spatial change indices.
              </p>
              <div className="mt-3 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <span>LlamaIndex + pgvector Active</span> &rarr;
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Activity Stream (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Activity Stream</span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {blocks.slice(0, 4).map((b, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono text-cyan-400 font-semibold">Block #{b.blockNumber}</span>
                    <span className="text-slate-500">{b.timestamp}</span>
                  </div>
                  <p className="text-slate-200 font-medium text-[11px] truncate">{b.payloadSummary}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="truncate max-w-[140px] text-slate-500">{b.blockHash.substring(0, 16)}...</span>
                    <span className="text-emerald-400">{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => onNavigate('ledger')}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              View Full Audit Ledger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
