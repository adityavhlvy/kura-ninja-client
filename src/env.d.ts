/// <reference types="@rsbuild/core/types" />

declare interface ImportMetaEnv {
  readonly PUBLIC_SPOTIFY_CLIENT_ID: string;
  readonly PUBLIC_SPOTIFY_CLIENT_SECRET: string;
  readonly PUBLIC_SPOTIFY_REFRESH_TOKEN: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
