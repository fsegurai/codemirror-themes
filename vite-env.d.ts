interface ViteTypeOptions {
    // By adding this line, you can make the type of ImportMetaEnv strict
    // to disallow unknown keys.
    strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
    readonly PROD: boolean
    readonly MODE: string
    readonly VITE_HOST_URL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
