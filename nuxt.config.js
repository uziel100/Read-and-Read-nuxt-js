import colors from 'vuetify/es5/util/colors'

export default {
  ssr: true,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s | Read&Read',
    // title: 'ReadAndRead',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

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
    '@nuxtjs/auth-next'
  ],

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
          login: { url: 'login', method: 'post', propertyName: 'user' },
          // user: { url: 'me', method: 'get', propertyName: 'user' },
          user: false,
          logout: false
        },        
        tokenType: false        
      }
    },
    redirect:{
      login: false,
      home: false,
      callback: false,
      logout: '/',
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
