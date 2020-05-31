export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: '超速シミュ',
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'ミニ四駆 超速グランプリ 改造シミュレータ',
      },
      { hid: 'og:site_name', property: 'og:site_name', content: '超速シミュ' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://mini4.now.sh/' },
      { hid: 'og:title', property: 'og:title', content: '超速シミュ' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'ミニ四駆 超速グランプリ 改造シミュレータ',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://mini4.now.sh/ogimage.png',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://mini4.now.sh/',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    FB_API_KEY: 'AIzaSyCb3v2C82H7_TxMMUIFJsRKMNCd5YiNOhY',
    FB_AUTH_DOMAIN: 'mini4-42a9c.firebaseapp.com',
    FB_DATABASE_URL: 'https://mini4-42a9c.firebaseio.com',
    FB_PROJECT_ID: 'mini4-42a9c',
    FB_STORAGE_BUCKET: 'mini4-42a9c.appspot.com',
    FB_MESSAGING_SENDER_ID: '563724539640',
    FB_APP_ID: '1:563724539640:web:8dedcce4d9c8fa19b8cd0d',
    FB_MEASUREMENT_ID: 'G-QMZX91XY02',
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@assets/app.less'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/firebase-client', mode: 'client' },
    { src: '@/plugins/localStorage', mode: 'client' },
    { src: '@/plugins/viewportunits', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-37634759-16',
      },
    ],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // https://github.com/visualfanatic/vue-svg-loader
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
      svgRule.test = /\.(png|jpe?g|gif|webp)$/
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          'babel-loader',
          { loader: 'vue-svg-loader', options: { svgo: false } },
        ],
      })
    },
  },
}
