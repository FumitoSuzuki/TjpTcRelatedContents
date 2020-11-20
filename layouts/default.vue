<template>
  <div class="container">
    <Nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          innerHTML: `
var _ua = (function(u){
  return {
    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
        || u.indexOf("ipad") != -1
        || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
        || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
        || u.indexOf("kindle") != -1
        || u.indexOf("silk") != -1
        || u.indexOf("playbook") != -1,
    Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
        || u.indexOf("iphone") != -1
        || u.indexOf("ipod") != -1
        || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
        || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
        || u.indexOf("blackberry") != -1
  };

})(window.navigator.userAgent.toLowerCase()); `,
          type: "text/javascript",
          charset: "utf-8",
          body: true,
        },
        {
          src: "/pages/contents/jpucar/assets/jslib/gazoo360_bundle.js",
          body: true,
        },
        {
          src: "/pages/contents/jpucar/assets/jslib/gazoo360_agent_finder.js",
          body: true,
        },
        {
          src: "/pages/contents/jpucar/assets/jslib/cri_liveact.js",
          body: true,
        },
        {
          src: "/pages/contents/jpucar/assets/jslib/cri_liveact_webgl.js",
          body: true,
        },
        {
          src: "/pages/contents/jpucar/assets/jslib/cri_liveact_framework.js",
          body: true,
        },
        {
          src:
            "/pages/contents/jpucar/assets/jslib/cri_liveact_framework_custom.js",
          body: true,
        },
        // { src: "https://toyota-jp.contents.liveact.cri-mw.jp/liveact_72855f6c37ae9c4ac0.1435862526/cri_liveact_embed.js", body: true },
        { src: "/pages/contents/jpucar/assets/fonts/index.js", body: true },
        { src: "/pages/contents/jpucar/assets/js/main.js", body: true },
        { src: "/pages/contents/jpucar/assets/js/cardetail.js", body: true },
        { src: "/pages/contents/jpucar/assets/js/view360.js", body: true },
      ],
    };
  },
};
</script>
