/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_API_BASE_URL: string;
  // add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}