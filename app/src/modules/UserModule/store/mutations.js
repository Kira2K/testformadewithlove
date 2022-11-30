import * as types from './types/mutations.type'

export default {
  [types.SET_USER_ID] (state, value) {
    state.$userID = value || ''
  },
  [types.SET_USER_ROLES] (state, value) {
    state.$roles = value || []
  },
  [types.SET_PROCESS] (state, value) {
    state.process = value
  }
}
