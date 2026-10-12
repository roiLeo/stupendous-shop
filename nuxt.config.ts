export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@pinia/nuxt'],

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    classSuffix: '',
  },

  i18n: {
    locales: [
      { code: 'en', file: 'en.json', name: '🇬🇧' },
      { code: 'fr', file: 'fr.json', name: '🇫🇷' },
    ],
    // lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'no_prefix',
  },

  runtimeConfig: {
    polkadotHubWsUrl: 'wss://polkadot-asset-hub-rpc.polkadot.io',
    kusamaHubWsUrl:   'wss://kusama-asset-hub-rpc.polkadot.io',
    public: {
      CHAIN: process.env.CHAIN,
      COLLECTION_ID: process.env.COLLECTION_ID,
    },
  },

  nitro: {
    // IPFS metadata is immutable per CID → persist it across restarts.
    // Point `base` at a mounted volume in production.
    storage: {
      ipfs: { driver: 'fs', base: './.data/ipfs' },
    },
  },

  vite: {
    // PAPI uses top-level await — required for Smoldot / light-client workers
    build: { target: 'esnext' },
  },

  compatibilityDate: '2025-01-23',
});
