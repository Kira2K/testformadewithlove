import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $lang: string,
    setShowServerError,
    $setTextShowServerError,
    $languages,
    $theme,
    $soundOn,
    $decreaseRequestCount,
    $increaseRequestCount
  }
}
