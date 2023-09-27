// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({

  devtools: { enabled: true },
  app: {
    head: {
      title: '',
      titleTemplate: '%s',
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'yandex-verification', content: '8f923e168571864e' },
        {
          name: 'google-site-verification',
          content: 'Ugejcci0-aD7mxPeHzRUrHpRoHx0C7C7AEOzXftcTVI',
        },
        { name: 'verify-admitad', content: '7f699afdb8' },
        {
          name: 'wmail-verification',
          content: 'a1ef8b92c390d31de577d80ab6860da6',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          sizes: '120x120',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          sizes: '120x120',
          href: '/favicon-120x120.ico',
        },
      ],
      script: [
        // {
        //   src: "/js/yacontext.js"
        // },
        // {
        //   src: "https://yandex.ru/ads/system/context.js",
        //   async: true
        // },
        // {
        //   src: "/js/mobileAd.js"
        // },
        {
          src: '/js/yndx.js',
        },
        {
          src: '/js/google.js',
        },
      ],
    },
  },

  css:[
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  modules: [
    // '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  tailwindcss: {
    cssPath: '~/assets/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },

  components: false,

})
