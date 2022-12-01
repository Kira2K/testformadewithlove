import * as types from './types/mutations.type'

export default {
  [types.SET_THEME] (state, value) {
    state.$theme = value
  },
  [types.SET_LANG] (state, value) {
    state.$lang = value
  },
  [types.SET_MENU_COLLAPSED] (state, value) {
    state.menuCollapsed = value
  },
  [types.SET_SOUND] (state, value) {
    state.$sound = value
  },
  [types.SET_SHOW_SERVER_ERROR] (state, value) {
    state.showServerError = value
  },
  [types.SET_TEXT_SHOW_SERVER_ERROR] (state, value) {
    state.textShowServerError = value
  },
  [types.SET_ACTIVE_REQUEST_COUNT] (state, value) {
    state.activeRequestCount = value
  }
}
