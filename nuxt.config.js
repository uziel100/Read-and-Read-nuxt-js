import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s | Read&Read',
    // title: 'ReadAndRead',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width:device-width, initial-scale:1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-2048-2732.jpeg", media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-2732-2048.jpeg", media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-1668-2388.jpeg", media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-2388-1668.jpeg", media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-1536-2048.jpeg", media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-2048-1536.jpeg", media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-1668-2224.jpeg", media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-2224-1668.jpeg", media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-1620-2160.jpeg", media: "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-2160-1620.jpeg", media: "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-1284-2778.jpeg", media: "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-2778-1284.jpeg", media: "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-1170-2532.jpeg", media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-2532-1170.jpeg", media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-1125-2436.jpeg", media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-2436-1125.jpeg", media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-1242-2688.jpeg", media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-2688-1242.jpeg", media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-828-1792.jpeg", media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-1792-828.jpeg", media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-1242-2208.jpeg", media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-2208-1242.jpeg", media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-750-1334.jpeg", media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-1334-750.jpeg", media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-640-1136.jpeg", media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { rel: "apple-touch-startup-image", href: "/splash/apple-splash-1136-640.jpeg", media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
    ],
    script: [
      {
        src: 'https://apis.google.com/js/api:client.js',
        defer: true,
      },
      {
        src: "https://www.google.com/recaptcha/api.js?render:6LdQSkkaAAAAANrCpXGxHSzUEN3khnp3A4_pqn4T",
        defer: true

      }
    ],

  },
  loading: {
    color: '#2F80ED',
    height: '4px'
  },



  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/google-sign-in.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
  ],

  pwa: {
    meta: {
      title: 'Read&Read',
      author: 'Team Read&Read',
      mobileAppIOS: true,
    },
    icon: {
      fileName: 'icon.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
      purpose: 'any'
    },
    manifest: {
      name: 'Read&Read',
      short_name: 'Read&Read',
      description: 'Aplicación de venta de libros digitales, disfruta leerlo desde nuestra plataforma',
      charset: 'utf-8',
      lang: 'es',
      useWebmanifestExtension: false,
      background_color: '#062247',
      start_url: '/'
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:8080/api/v1/',
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#0078D4',
          secondary: '#48D77A',
          accent: '#2F80ED',

          error: '#FF5252',
          info: '#2196F3',
          success: '#48D77A',
          warning: '#FFC107',

          section: '#121C25',
          section2: '#151E21',
          background: '#202124',
          cards: '#1E1E1E',
          footer: '#121C25',
          footer2: '#121212',
          navbar: '#292A2D',
          icons: '#E8EAED',
          search: '#202123',
          title: '#ffffff',

          backgrounduser: '#202124'
        },
        light: {
          primary: '#062146',
          secondary: '#48D77A',
          accent: '#2F80ED',

          error: '#FF5252',
          info: '#2196F3',
          success: '#48D77A',
          warning: '#FFC107',

          section: '#062146',
          section2: '#2F80ED',
          background: '#FFFFFF',
          cards: '#FFFFFF',
          footer: '#062146',
          footer2: '#041327',
          navbar: '#FFFFFF',
          icons: '#062146',
          title: '#555555',

          backgrounduser: '#FBFAFF'

        },
      }
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login/twoFactor', method: 'post', propertyName: 'token' },
          // user: { url: 'me', method: 'get', propertyName: 'data' },
          user: false,
          logout: false
        },
        tokenType: false
      }

    },
    redirect: {
      login: false,
      home: false,
      callback: false,
      logout: '/',
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: ['vue-pdf'],
    extend(config, ctx) {
      config.output.globalObject = 'this'
    }
  }
}
