// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [[
    '@pinia/nuxt',
    {
      autoImports: [
        'storeToRefs',
        'defineStore',
        'acceptHMRUpdate'
      ]
    }
  ],
    '@nuxt/image',
    '@nuxt/ui'
  ],

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      'postcss-nested': {}
    }
  }

});
