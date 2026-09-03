import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { LandParcel } from '../types';
import { MapPin, Layers, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Search, FileSpreadsheet, Eye, Satellite } from 'lucide-react';

interface GisMapViewerProps {
  parcels: LandParcel[];
}

export const GisMapViewer: React.FC<GisMapViewerProps> = ({ parcels }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonLayersRef = useRef<L.Polygon[]>([]);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [selectedParcel, setSelectedParcel] = useState<LandParcel>(parcels[0]);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'CLEAR' | 'DISPUTED'>('ALL');
  const [isSatellite, setIsSatellite] = useState<boolean>(false);
  const [khasraSearch, setKhasraSearch] = useState<string>('');

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Pune Maharashtra Cadastral Testbed
    const map = L.map(mapContainerRef.current).setView([18.5204, 73.8567], 14);
    mapInstanceRef.current = map;

    const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    });

    darkTiles.addTo(map);
    tileLayerRef.current = darkTiles;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Toggle Satellite vs Dark Carto Tiles
  const toggleTileLayer = () => {
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    if (!isSatellite) {
      // Switch to Satellite
      const satTiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = satTiles;
      setIsSatellite(true);
    } else {
      // Switch back to Dark
      const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = darkTiles;
      setIsSatellite(false);
    }
  };

  // Re-draw polygons on filter/parcel change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    polygonLayersRef.current.forEach(layer => layer.remove());
    polygonLayersRef.current = [];

    const filteredParcels = parcels.filter(p => {
      if (activeFilter === 'CLEAR') return p.disputeStatus === 'CLEAR';
      if (activeFilter === 'DISPUTED') return p.disputeStatus !== 'CLEAR';
      return true;
    });

    filteredParcels.forEach(parcel => {
      let color = '#10B981'; // Green
      if (parcel.disputeStatus === 'UNDER_APPEAL') color = '#F59E0B'; // Amber
      if (parcel.disputeStatus === 'ENCROACHMENT_RISK') color = '#EF4444'; // Red

      const isSelected = parcel.parcelId === selectedParcel.parcelId;

      const polygon = L.polygon(parcel.coordinates, {
        color: isSelected ? '#06B6D4' : color,
        fillColor: color,
        fillOpacity: isSelected ? 0.6 : 0.35,
        weight: isSelected ? 3 : 2
      }).addTo(mapInstanceRef.current!);

      polygon.bindTooltip(`Khasra: ${parcel.khasraNo} • ${parcel.landUseCategory}`, {
        permanent: false,
        direction: 'center',
        className: 'bg-slate-900 text-white font-mono text-xs border border-slate-700 px-2 py-1 rounded shadow-lg'
      });

      polygon.on('click', () => {
        setSelectedParcel(parcel);
      });

      polygonLayersRef.current.push(polygon);
    });
  }, [parcels, activeFilter, selectedParcel]);

  const handleKhasraSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!khasraSearch.trim()) return;

    const matched = parcels.find(p => p.khasraNo.toLowerCase().includes(khasraSearch.trim().toLowerCase()));
    if (matched && mapInstanceRef.current) {
      setSelectedParcel(matched);
      const center = matched.coordinates[0];
      mapInstanceRef.current.flyTo(center, 15, { duration: 1.2 });
    }
  };

  return (
    <div className="space-y-4">
      {/* Control Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl glass-panel">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-950 text-cyan-400 border border-blue-800">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">NAKSHA Cadastral GIS Engine</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono border border-emerald-800">
                PostGIS ST_Intersects Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              High-precision parcel boundaries with multi-tier title provenance and dispute classification.
            </p>
          </div>
        </div>

        {/* Quick Khasra Search & Map Layer Mode */}
        <div className="flex flex-wrap items-center gap-2">
          <form onSubmit={handleKhasraSearch} className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={khasraSearch}
              onChange={(e) => setKhasraSearch(e.target.value)}
              placeholder="Jump to Khasra No (e.g. 482/1-B)..."
              className="bg-slate-900 border border-slate-700 text-white rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-cyan-400 font-mono"
            />
          </form>

          {/* Satellite Toggle */}
          <button
            onClick={toggleTileLayer}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
              isSatellite
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Satellite className="w-3.5 h-3.5" />
            {isSatellite ? 'Satellite Imagery' : 'Dark Carto Base'}
          </button>

          {/* Filter Pills */}
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === 'ALL' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({parcels.length})
            </button>
            <button
              onClick={() => setActiveFilter('CLEAR')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === 'CLEAR' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Clear Title
            </button>
            <button
              onClick={() => setActiveFilter('DISPUTED')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === 'DISPUTED' ? 'bg-amber-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dispute / Review
            </button>
          </div>
        </div>
      </div>

      {/* Main Map + Parcel Dossier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Canvas (7 cols) */}
        <div className="lg:col-span-7 h-[360px] lg:h-[580px] rounded-2xl overflow-hidden border border-slate-800 relative shadow-2xl">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Floating Map Legend */}
          <div className="absolute bottom-2.5 left-2.5 z-[1000] p-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-[10px] sm:text-xs space-y-1 sm:space-y-1.5 shadow-2xl max-w-[200px] sm:max-w-none">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
              Cadastral Classification
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/60 border border-emerald-400 shrink-0"></span>
              <span className="text-slate-300 truncate">Clear Title</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/60 border border-amber-400 shrink-0"></span>
              <span className="text-slate-300 truncate">Under Appeal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/60 border border-rose-400 shrink-0"></span>
              <span className="text-slate-300 truncate">Encroachment Risk</span>
            </div>
          </div>
        </div>

        {/* Selected Parcel Dossier (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl glass-panel flex flex-col justify-between overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">Active Spatial Dossier</span>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Khasra #{selectedParcel.khasraNo}
                </h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                selectedParcel.disputeStatus === 'CLEAR'
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                  : 'bg-amber-950 text-amber-400 border-amber-800'
              }`}>
                {selectedParcel.disputeStatus.replace('_', ' ')}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-3">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Registered Entity</span>
                <span className="text-white font-medium truncate block">{selectedParcel.currentOwner}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Surveyed Area</span>
                <span className="text-cyan-400 font-mono font-bold">{selectedParcel.areaHectares} Hectares</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Land Use Classification</span>
                <span className="text-slate-200 font-medium">{selectedParcel.landUseCategory}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Market Valuation</span>
                <span className="text-emerald-400 font-mono font-semibold">₹{selectedParcel.marketValuationCr} Cr</span>
              </div>
            </div>

            {/* Historical Transfer Provenance Stepper */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Cadastral Title Provenance ({selectedParcel.ownerProvenanceCount} Transfers)
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                  <span className="text-slate-400 font-mono text-[11px]">2004:</span>
                  <span className="text-slate-300">Initial Cadastral Demarcation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                  <span className="text-slate-400 font-mono text-[11px]">2018:</span>
                  <span className="text-slate-300">Succession Deed Executed &amp; Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-emerald-400 font-mono text-[11px]">2026:</span>
                  <span className="text-emerald-300 font-semibold">DGPS Resurvey Stamped on Blockchain</span>
                </div>
              </div>
            </div>

            {/* Blockchain Hash Badge */}
            <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400 mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Cadastral SHA-256 Hash
              </div>
              <div className="text-[11px] font-mono text-cyan-300 break-all select-all">
                {selectedParcel.blockchainHash}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert(`Exporting enterprise cadastral dossier for Khasra ${selectedParcel.khasraNo}...`)}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export Spatial Dossier (GeoJSON &amp; PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
