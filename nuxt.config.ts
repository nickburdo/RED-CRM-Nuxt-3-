// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-icon',
    ['@vee-validate/nuxt', {autoImports: true}],
  ],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  runtimeConfig: {
    public: {
      projectId: process.env.PROJECT_ID,
      apiEndpoint: process.env.API_ENDPOINT,
    }
  }
})