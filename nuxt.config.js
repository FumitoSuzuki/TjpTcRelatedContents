export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'TjpTcRelatedContents',
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1.0,minimum-scale=1.0,user-scalable=no"
      },
      {
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge"
      },
      { name: "format-detection", content: "telephone=no" },
      { name: "name", content: "" },
      { name: "description", content: "" }
    ],
    script: [
      {
        src: "https://toyota.jp/pages/_system/common/js/lib/jquery-2.2.4.min.js"
      },
      { src: "https://toyota.jp/pages/_system/common/js/hosts/hosts.js" },
      {
        src: "https://toyota.jp/pages/contents/include/common/js/tjp_common.js"
      },
      // {
      //   src: "https://code.jquery.com/jquery-2.2.4.min.js",
      //   integrity: "sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=",
      //   crossorigin: "anonymous"
      // }
    ],
    link: [
      // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "/pages/contents/jpucar/assets/css/style.css"
      },
      {
        rel: "stylesheet",
        href: "/pages/contents/jpucar/assets/csslib/cri_liveact.css"
      },
      {
        rel: "stylesheet",
        href: "/pages/contents/jpucar/assets/csslib/gazoo360_edit.css"
      },
      {
        rel: "stylesheet",
        href: "/pages/contents/jpucar/assets/css/view360.css"
      },
      {
        rel: "stylesheet",
        href: "/pages/contents/jpucar/assets/css/cardetail.css"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {},
  },
  generate: {
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeAttributeQuotes: false,
      removeComments: false,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      removeTagWhitespace: false,
      sortAttributes: true,
      sortClassName: true,
      trimCustomFragments: true,
      useShortDoctype: true
    }
  }
}
