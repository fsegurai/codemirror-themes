interface ViteTypeOptions {
  // Set this to true to enable strict type checking for ImportMetaEnv
  strictImportMetaEnv: true;
}

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_BUILD_ID: string
  readonly VITE_HOST_URL: string;
}
