import React from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Database, 
  Bot, 
  FileCheck2, 
  BarChart3, 
  ChevronRight, 
  Settings, 
  Layers,
  Activity,
  UserCheck,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: string;
  setUserRole: (role: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  isMobileOpen,
  onCloseMobile,
}) => {
  const menuItems = [
    { id: 'analytics', label: 'Dashboard & KPIs', icon: BarChart3, badge: null },
    { id: 'gis', label: 'Cadastral Map Studio', icon: MapPin, badge: 'Live' },
    { id: 'ledger', label: 'Blockchain Audit Vault', icon: ShieldCheck, badge: 'DPoS' },
    { id: 'evidence', label: 'Evidence Repository', icon: Database, badge: '4' },
    { id: 'ai-copilot', label: 'AI Land Copilot', icon: Bot, badge: 'RAG' },
    { id: 'compliance', label: 'Compliance & Gaps', icon: FileCheck2, badge: '2 Alerts' },
  ];

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0F172A] border-r border-slate-800 flex flex-col shrink-0 select-none transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 lg:w-64 lg:h-screen lg:sticky lg:top-0
        ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-tight text-base">VISION</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  SaaS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">Land Intelligence Platform</p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workspace Switcher */}
        <div className="px-3 py-3 border-b border-slate-800/60">
          <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Active Workspace</div>
            <div className="font-semibold text-white mt-0.5 flex items-center justify-between">
              <span className="truncate">Maharashtra Cadastral Zone</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] uppercase tracking-wider font-mono text-slate-400 px-3 pb-2">
            Platform Suite
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'
                  }`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-blue-800 text-white'
                      : 'bg-slate-800 text-cyan-400 border border-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Role Profile Switcher */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Operating Persona</span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Verified RBAC
            </span>
          </div>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="Executive Officer">Enterprise Director</option>
            <option value="Cadastral Surveyor">Cadastral Surveyor</option>
            <option value="Lead Researcher">Research Analyst</option>
            <option value="Compliance Auditor">Cryptographic Auditor</option>
          </select>
        </div>
      </aside>
    </>
  );
};
