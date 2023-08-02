/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_API_ENDPOINT: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}