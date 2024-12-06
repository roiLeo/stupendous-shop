export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['@/assets/styles/main.css'],
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@pinia/nuxt'],

  ui: {
    global: true,
  },

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

  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },

  nitro: {
    externals: {
      traceInclude: []
    }
  },

  runtimeConfig: {
    public: {
      CHAIN: process.env.CHAIN,
      COLLECTION_ID: process.env.COLLECTION_ID,
    },
  },

  compatibilityDate: '2024-12-06',
})
