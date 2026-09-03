import React, { useState } from 'react';
import { ResearchEvidence } from '../types';
import { Bot, Sparkles, Send, Zap, Copy, Check, FileText, Sliders, ArrowRight, ShieldCheck } from 'lucide-react';

interface AiCopilotProps {
  evidences: ResearchEvidence[];
  onNavigateToLedger: (hash: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'USER' | 'COPILOT';
  content: string;
  citedBlockNumber?: number;
  citedEvidenceId?: string;
  timestamp: string;
}

export const AiCopilot: React.FC<AiCopilotProps> = ({ evidences, onNavigateToLedger }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'COPILOT',
      content: "Hello! I am your AI Land Intelligence Copilot. I analyze peer-reviewed cadastre literature, spatial boundary indicators, and blockchain-anchored records to give you verifiable land intelligence.",
      timestamp: '10:42 AM'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Calibration weights
  const [freshnessWeight, setFreshnessWeight] = useState(35);
  const [geoWeight, setGeoWeight] = useState(35);
  const [sourceWeight, setSourceWeight] = useState(30);

  const promptSuggestions = [
    "How does fog computing reduce cadastral latency and prevent double-selling?",
    "Detect agricultural land divergence risks in peri-urban sectors",
    "Identify empirical evidence deficits in Agro-Territorial Cadastre standard",
    "Explain how SHA-256 Merkle root guarantees land title integrity"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'USER',
      content: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = "";
      let citedBlock = 10482;
      let citedId = "EVD-2026-001";

      if (query.toLowerCase().includes('divergence') || query.toLowerCase().includes('agricultural')) {
        reply = "Multi-Spectral Analysis (Block #10479): Cross-referencing NDVI satellite imagery with cadastral boundaries detected a 14.2% unauthorized land divergence in peri-urban test sectors. Soil moisture depletion patterns correlate with unpermitted grading operations, allowing automated enforcement alerts before physical structures are erected.";
        citedBlock = 10479;
        citedId = "EVD-2026-002";
      } else if (query.toLowerCase().includes('deficit') || query.toLowerCase().includes('compliance')) {
        reply = "Compliance Gap Flag: Current regulatory baselines for agricultural preservation lack localized groundwater table telemetry correlation. Recommendation: Integrate aquifer recharge datasets to qualify boundary conversion approvals.";
        citedBlock = 10480;
        citedId = "EVD-2026-003";
      } else if (query.toLowerCase().includes('merkle') || query.toLowerCase().includes('integrity')) {
        reply = "Cryptographic Architecture: Each cadastral deed and surveyor GeoTIFF boundary mark is hashed via SHA-256 and anchored into a Merkle tree root. Any retroactive alteration to a boundary polygon or ownership transfer invalidates the top-level root hash across all validator nodes.";
        citedBlock = 10481;
        citedId = "EVD-2026-004";
      } else {
        reply = "Latency & Concurrency Analysis (Block #10482): Decentralized edge verification nodes deployed at regional registry sectors reduce commit latency to 280ms. This closes the double-encumbrance window where malicious actors attempt concurrent registrations of identical Khasra parcels.";
        citedBlock = 10482;
        citedId = "EVD-2026-001";
      }

      const copilotMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'COPILOT',
        content: reply,
        citedBlockNumber: citedBlock,
        citedEvidenceId: citedId,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, copilotMsg]);
      setIsThinking(false);
    }, 900);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[680px]">
      {/* Left Chat Console (8 cols) */}
      <div className="lg:col-span-8 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between overflow-hidden shadow-xl min-h-[500px] lg:min-h-0">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">AI Land Intelligence Copilot</h3>
              <p className="text-[11px] text-slate-400">Context-grounded RAG over blockchain-verified cadastre records</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
            pgvector Active
          </span>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xl rounded-2xl p-4 text-xs space-y-2 ${
                m.sender === 'USER'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between gap-4 text-[10px] text-slate-400">
                  <span className="font-semibold text-cyan-400">
                    {m.sender === 'USER' ? 'You' : 'VISION Copilot'}
                  </span>
                  <span>{m.timestamp}</span>
                </div>

                <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>

                {m.citedBlockNumber && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <button
                      onClick={() => onNavigateToLedger(`Block #${m.citedBlockNumber}`)}
                      className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Cited: Block #{m.citedBlockNumber}
                    </button>
                    <button
                      onClick={() => handleCopy(m.id, m.content)}
                      className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedId === m.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start">
              <div className="rounded-2xl p-4 bg-slate-900/90 border border-slate-800 text-xs text-cyan-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                Synthesizing context from vector store &amp; blockchain ledger...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar & Preset Chips */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 space-y-3">
          {/* Preset Chips */}
          <div className="flex flex-wrap gap-1.5">
            {promptSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 transition-all cursor-pointer border border-slate-700"
              >
                <Zap className="w-3 h-3 text-cyan-400" />
                <span className="truncate max-w-[240px]">{prompt}</span>
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask questions about parcel titling, cadastral regulations, or empirical studies..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={isThinking || !inputPrompt.trim()}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
        </div>
      </div>

      {/* Right Calibration & Indexed Citations (4 cols) */}
      <div className="lg:col-span-4 space-y-4 flex flex-col justify-between overflow-y-auto">
        {/* Dynamic Weight Tuning Panel */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Qualification Engine Calibration
            </span>
            <span className="text-[10px] font-mono text-slate-400">Live</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Freshness Weight ({freshnessWeight}%)</span>
                <span className="font-mono text-emerald-400">Decay: 3.5%/yr</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={freshnessWeight}
                onChange={(e) => setFreshnessWeight(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Geo-Applicability ({geoWeight}%)</span>
                <span className="font-mono text-cyan-400">Regional Fit</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={geoWeight}
                onChange={(e) => setGeoWeight(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Source Consistency ({sourceWeight}%)</span>
                <span className="font-mono text-blue-400">Peer-Review</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={sourceWeight}
                onChange={(e) => setSourceWeight(Number(e.target.value))}
                className="w-full accent-blue-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Indexed Knowledge Bases */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3 shadow-xl">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Indexed Evidence Repositories
          </span>
          <div className="space-y-2 text-xs">
            {evidences.slice(0, 3).map((e) => (
              <div key={e.id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{e.source}</span>
                  <span className="text-emerald-400">{e.qualificationScore.overall}% Score</span>
                </div>
                <h4 className="text-xs font-semibold text-white mt-1 truncate">{e.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
