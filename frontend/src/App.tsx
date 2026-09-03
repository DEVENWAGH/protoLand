import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { AnalyticsOverview } from './components/AnalyticsOverview';
import { GisMapViewer } from './components/GisMapViewer';
import { LedgerExplorer } from './components/LedgerExplorer';
import { EvidenceVault } from './components/EvidenceVault';
import { AiCopilot } from './components/AiCopilot';
import { ComplianceMatrix } from './components/ComplianceMatrix';
import { SimulateIngestionModal } from './components/SimulateIngestionModal';
import { mockBlocks as initialBlocks, mockEvidences, mockParcels, mockRegulatoryRecords } from './data/mockData';
import { BlockchainBlock } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('analytics');
  const [userRole, setUserRole] = useState<string>('Executive Officer');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [blocks, setBlocks] = useState<BlockchainBlock[]>(initialBlocks);
  const [isIngestModalOpen, setIsIngestModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleBlockMinted = (newBlock: BlockchainBlock) => {
    setBlocks([newBlock, ...blocks]);
  };

  const handleNavigateToLedgerWithHash = (hash: string) => {
    setActiveTab('ledger');
  };

  const currentBlockNumber = blocks.length > 0 ? blocks[0].blockNumber : 10482;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex selection:bg-cyan-500 selection:text-white relative overflow-x-hidden">
      {/* SaaS Product Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <TopNavbar
          onOpenIngestModal={() => setIsIngestModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentBlockNumber={currentBlockNumber}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Viewport Content */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'analytics' && (
            <AnalyticsOverview
              onNavigate={(tab) => setActiveTab(tab)}
              blocks={blocks}
              parcels={mockParcels}
              evidences={mockEvidences}
            />
          )}

          {activeTab === 'gis' && (
            <GisMapViewer parcels={mockParcels} />
          )}

          {activeTab === 'ledger' && (
            <LedgerExplorer blocks={blocks} />
          )}

          {activeTab === 'evidence' && (
            <EvidenceVault
              evidences={mockEvidences}
              onNavigateToLedger={handleNavigateToLedgerWithHash}
            />
          )}

          {activeTab === 'ai-copilot' && (
            <AiCopilot
              evidences={mockEvidences}
              onNavigateToLedger={handleNavigateToLedgerWithHash}
            />
          )}

          {activeTab === 'compliance' && (
            <ComplianceMatrix
              records={mockRegulatoryRecords}
              onOpenCopilot={() => setActiveTab('ai-copilot')}
            />
          )}
        </main>

        {/* Subtle Enterprise Footer */}
        <footer className="border-t border-slate-800/80 py-4 px-6 text-xs text-slate-500 bg-[#0F172A]/40 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">VISION Enterprise</span>
            <span>&bull;</span>
            <span>Decentralized Cadastral Provenance &amp; Spatial Intelligence</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
            <span>DPoS Consensus</span>
            <span>&bull;</span>
            <span>PostGIS 16 EPSG:4326</span>
            <span>&bull;</span>
            <span>LlamaIndex RAG</span>
          </div>
        </footer>
      </div>

      {/* Interactive Modal for Ingesting & Minting Evidence */}
      <SimulateIngestionModal
        isOpen={isIngestModalOpen}
        onClose={() => setIsIngestModalOpen(false)}
        onBlockMinted={handleBlockMinted}
      />
    </div>
  );
};

export default App;
