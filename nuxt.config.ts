// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/scss/main.scss'],

    modules: ['@nuxtjs/sanity', '@pinia/nuxt', '@nuxtjs/device', '@vite-pwa/nuxt'],

    sanity: {
        projectId: 'mgriwqg2',
    },

    pwa: {
        manifest: {
            name: 'Sokol Lípa',
            short_name: 'Sokol Lípa',
            description: 'Sokol Lípa - aplikace pro fotbal Sokol Lípa obce Lípa, Česká republika',
            start_url: '/',
            display: 'standalone',
            background_color: '#FFFFFF',
            theme_color: '#16a34a',
            icons: [
                {
                    src: '/android-chrome-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: '/android-chrome-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
            ],
        },
    },

    compatibilityDate: '2024-08-18',
});
