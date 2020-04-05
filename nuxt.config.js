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
        href: 'https://fonts.googleapis.com/css2?family=Anton&display=swap',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
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
    extend(config, ctx) {},
  },
}
