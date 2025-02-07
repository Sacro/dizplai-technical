// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/ui',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  nitro: {
    experimental: {
      database: true,
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
