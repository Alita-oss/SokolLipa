// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/scss/main.scss'],
    modules: [
      '@nuxtjs/sanity',
      '@pinia/nuxt',
      '@nuxtjs/device',
    ],
    sanity: {
      projectId: 'mgriwqg2'
    }
})
