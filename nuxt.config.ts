// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],

  modules: ['@nuxtjs/sanity', '@pinia/nuxt', '@nuxtjs/device', "@vite-pwa/nuxt"],

  sanity: {
    projectId: 'mgriwqg2'
  },

  compatibilityDate: '2024-08-18'
})