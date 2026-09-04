/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_AI_API_BASE_URL: string;
  readonly VITE_CONTRACT_ADDRESS: string;
  readonly VITE_BLOCKCHAIN_NETWORK: string;
  readonly VITE_BLOCKCHAIN_EXPLORER_URL: string;
  readonly VITE_GIS_TILE_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
