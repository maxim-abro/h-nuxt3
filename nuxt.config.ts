// https://nuxt.com/docs/api/configuration/nuxt-config
import axios from "axios";

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      link: [
        {
          rel: "stylesheet",
          href: "/fonts/Roboto-Black.woff2",
        },
        {
          rel: "stylesheet",
          href: "/fonts/Roboto-Bold.woff2",
        },
        {
          rel: "stylesheet",
          href: "/fonts/Roboto-Light.woff2",
        },
        {
          rel: "stylesheet",
          href: "/fonts/Roboto-Medium.woff2",
        },
        {
          rel: "stylesheet",
          href: "/fonts/Roboto-Regular.woff2",
        },
        {
          rel: "stylesheet",
          href: "/fonts/Roboto-Thin.woff2",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          sizes: "120x120",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/x-icon",
          sizes: "120x120",
          href: "/favicon-120x120.ico",
        },
      ],
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
        { name: "yandex-verification", content: "8f923e168571864e" },
        {
          name: "google-site-verification",
          content: "Ugejcci0-aD7mxPeHzRUrHpRoHx0C7C7AEOzXftcTVI",
        },
        { name: "verify-admitad", content: "7f699afdb8" },
        {
          name: "wmail-verification",
          content: "a1ef8b92c390d31de577d80ab6860da6",
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
          src: "/js/yndx.js",
        },
        {
          src: "/js/google.js",
        },
      ],
      title: "",
      titleTemplate: `%s`,
    },
  },

  css: ["~/assets/style.css"],

  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-simple-sitemap",
    "@nuxtjs/color-mode",
    "nuxt-icons",
    "nuxt-gtag",
    // "@vite-pwa/nuxt",
    // "@nuxt/image",
  ],

  gtag: {
    id: "G-V6ZSLDKYV2",
  },

  // image: {
  //   quality: 10,
  //   format: ["webp"],
  // },

  // pwa: {
  //   registerType: "autoUpdate",
  //   manifest: {
  //     name: "za halyavoi",
  //     short_name: "halyava",
  //     theme_color: "#ffffff",
  //     icons: [
  //       {
  //         src: "icons/icon-72x72.png",
  //         sizes: "72x72",
  //         type: "image/png",
  //       },
  //       {
  //         src: "icons/icon-128x128.png",
  //         sizes: "128x128",
  //         type: "image/png",
  //       },
  //       {
  //         src: "icons/icon-144x144.png",
  //         sizes: "144x144",
  //         type: "image/png",
  //       },
  //       {
  //         src: "icons/icon-152x152.png",
  //         sizes: "152x152",
  //         type: "image/png",
  //       },
  //       {
  //         src: "icons/icon-192x192.png",
  //         sizes: "192x192",
  //         type: "image/png",
  //       },
  //       {
  //         src: "icons/icon-384x384.png",
  //         sizes: "384x384",
  //         type: "image/png",
  //       },
  //       {
  //         src: "icons/icon-512x512.png",
  //         sizes: "512x512",
  //         type: "image/png",
  //       },
  //     ],
  //   },
  //   workbox: {
  //     navigateFallback: "/",
  //     globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
  //   },
  //   client: {
  //     installPrompt: true,
  //     // you don't need to include this: only for testing purposes
  //     // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
  //     periodicSyncForUpdates: 20,
  //   },
  //   devOptions: {
  //     enabled: true,
  //     suppressWarnings: true,
  //     navigateFallbackAllowlist: [/^\/$/],
  //     type: "module",
  //   },
  // },

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },

  sitemap: {
    urls: async () => {
      const result: any[] = [];
      const [categoryData, shopData, holidayData, blogData] = await Promise.all(
        [
          axios.get("https://za-halyavoi.ru/api/admin/sitemap/category"),
          axios.get("https://za-halyavoi.ru/api/admin/sitemap/shop"),
          axios.get("https://za-halyavoi.ru/api/admin/sitemap/holidays"),
          axios.get("https://za-halyavoi.ru/api/admin/sitemap/blog"),
        ],
      );
      categoryData.data.forEach((i: any) =>
        result.push(`/categories/${i.lat_title}`),
      );
      shopData.data.forEach((i: any) => result.push(`/shop/${i.lat_title}`));
      holidayData.data.forEach((i: any) => result.push(`/tags/${i.lat_title}`));
      blogData.data.forEach((i: any) => result.push(`/blog/${i.lat_title}`));
      return result.map((p) => {
        return {
          loc: p,
          lastmod: new Date(),
          changefreq: "daily",
          priority: 0.8,
        };
      });
    },
    exclude: ["/go", "/search"],
  },

  tailwindcss: {
    cssPath: "~/assets/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },

  components: false,
});
