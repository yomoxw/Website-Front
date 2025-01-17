import colors from "vuetify/lib/util/colors"

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL:
        process.env.NODE_ENV === "production"
          ? "api.geode-solutions.com"
          : "localhost",
      VIEWER_PROTOCOL: process.env.NODE_ENV === "production" ? "wss" : "ws",
      GEODE_PROTOCOL: process.env.NODE_ENV === "production" ? "https" : "http",
      VIEWER_PORT: process.env.NODE_ENV === "production" ? "443" : "1234",
      GEODE_PORT: process.env.NODE_ENV === "production" ? "443" : "5000",
      SITE_BRANCH:
        process.env.NODE_ENV === "production" ? process.env.SITE_BRANCH : "",
      PROJECT: "website",
      NODE_ENV: process.env.NODE_ENV,
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    },
  },

  extends: ["@geode/opengeodeweb-front"],

  routeRules: {
    "/tools/**": { ssr: false },
    "/workflows/**": { ssr: false },
  },

  // ** Customize the progress-bar color
  loading: { color: "#fff" },

  // ** Global CSS
  css: ["vuetify/lib/styles/main.sass"],

  // ** Nuxt.js modules
  modules: [
    [
      "@dargmuesli/nuxt-cookie-control",
      {
        controlButton: true,
        domain: "geode-solutions.com",
        colors: {
          modalOverlay: "#000",
          barBackground: colors.teal.darken1,
          barButtonColor: "#000",
          modalTextColor: "#000",
          modalOverlayOpacity: 0,
          modalButtonColor: "#fff",
          modalUnsavedColor: "#000",
          modalButtonBackground: colors.teal.darken1,
          controlButtonIconColor: colors.teal.darken1,
          checkboxActiveBackground: colors.teal.darken1,
          checkboxInactiveBackground: "#000",
          modalButtonHoverBackground: "#333",
          checkboxDisabledBackground: "#ddd",
          controlButtonIconHoverColor: colors.amber.accent4,
          controlButtonHoverBackground: colors.brown.darken4,
        },
      },
    ],
    [
      "@pinia/nuxt",
      {
        autoImports: ["storeToRefs", "defineStore"],
      },
    ],
    "@nuxt/devtools",
    "@vueuse/nuxt",
  ],

  cookies: {
    necessary: [
      {
        name: "Default Cookies",
        description: "Used for cookie control.",
        cookies: ["cookie_control_consent", "cookie_control_enabled_cookies"],
        isSecureContext: true,
      },
    ],
  },

  imports: {
    dirs: ["stores", "@geode/opengeodeweb-front/stores"],
  },

  // ** Build configuration
  build: {
    transpile: ["vuetify"],
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["md-linedivider"].includes(tag),
    },
  },

  devtools: {
    enabled: process.env.NODE_ENV === "production" ? false : true,
  },
})
