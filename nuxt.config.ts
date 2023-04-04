export default defineNuxtConfig({
  ssr: false,
	modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],
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
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
})
