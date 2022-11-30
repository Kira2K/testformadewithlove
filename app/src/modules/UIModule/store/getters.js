export default {
  $themes: (state) => state.themesList,
  $theme: (state) => state.$theme,
  $languages: (state) => state.langDict,
  $lang: (state) => state.$lang,
  $soundOn: (state) => state.$sound,
  getMenuCollapsed: (state) => state.menuCollapsed,
  getShowServerError: (state) => state.showServerError,
  getTextShowServerError: (state) => state.textShowServerError,
  getActiveRequestCount: (state) => state.activeRequestCount
}
