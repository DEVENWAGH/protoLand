import React from 'react';
import { Search, PlusCircle, Bell, Menu } from 'lucide-react';

interface TopNavbarProps {
  onOpenIngestModal: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  currentBlockNumber: number;
  onOpenMobileMenu: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenIngestModal,
  searchQuery,
  setSearchQuery,
  currentBlockNumber,
  onOpenMobileMenu,
}) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Menu Button + Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white lg:hidden cursor-pointer shrink-0"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Khasra, papers, or hashes..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 sm:pr-10 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
          />
          <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
            /
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 pl-2 shrink-0">
        {/* Real-time Consensus Heartbeat (desktop / tablet) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-emerald-400 font-semibold text-[11px]">DPoS</span>
          <span className="text-slate-600">|</span>
          <span className="font-mono text-slate-400 text-[11px]">#{currentBlockNumber}</span>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all cursor-pointer"
          title="System Audit Alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400"></span>
        </button>

        {/* Primary Action Button */}
        <button
          onClick={onOpenIngestModal}
          className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Ingest &amp; Anchor</span>
          <span className="sm:hidden">Ingest</span>
        </button>
      </div>
    </header>
  );
};
