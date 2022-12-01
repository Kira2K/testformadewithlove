import UIService from '../services/UI/UIService'
import * as types from './types/mutations.type'

export default {
  setThemeStyle ({ commit }, style) {
    commit(types.SET_THEME, UIService.setThemeStyle(style))
  },
  changeMenuCollapsed ({ commit, state }) {
    commit(types.SET_MENU_COLLAPSED, !state.menuCollapsed)
  },
  setMenuCollapsed ({ commit }, value) {
    commit(types.SET_MENU_COLLAPSED, value)
  },
  setLang ({ commit }, lang) {
    commit(types.SET_LANG, lang)
  },
  setSound ({ commit }, value) {
    commit(types.SET_SOUND, value)
  },
  $setShowServerError: {
    root: true,
    handler (namespacedContext, payload) {
      namespacedContext.commit(types.SET_SHOW_SERVER_ERROR, payload)
      if (payload === false) { namespacedContext.commit(types.SET_TEXT_SHOW_SERVER_ERROR, null) }
    }
  },
  $setTextShowServerError: {
    root: true,
    handler (namespacedContext, payload) {
      namespacedContext.commit(types.SET_SHOW_SERVER_ERROR, true)
      if (payload && typeof payload === 'string' && payload.length > 1) { namespacedContext.commit(types.SET_TEXT_SHOW_SERVER_ERROR, payload) }
    }
  },
  $increaseRequestCount: {
    root: true,
    handler ({ commit, getters }) {
      commit(types.SET_ACTIVE_REQUEST_COUNT, getters.getActiveRequestCount + 1)
    }
  },
  $decreaseRequestCount: {
    root: true,
    handler ({ commit, getters }) {
      const newCount = getters.getActiveRequestCount - 1
      commit(types.SET_ACTIVE_REQUEST_COUNT, newCount - 1 < 0 ? 0 : newCount)
    }
  },
  resetRequestCount ({ commit }) {
    commit(types.SET_ACTIVE_REQUEST_COUNT, 0)
  }
}
