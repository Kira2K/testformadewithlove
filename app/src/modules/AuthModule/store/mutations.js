import * as types from './types/mutations.type'

export default {
  [types.SET_SESSION] (state, value) {
    state.$session = value
  },
  [types.SET_ACCESS_TOKEN] (state, value) {
    state.$accessToken = value
  },
  [types.SET_REFRESH_TOKEN] (state, value) {
    state.$refreshToken = value
  },
  [types.SET_EXP_ACCESS_TIME] (state, value) {
    state.$expAccessTime = value
  },
  [types.SET_ROLES] (state, value) {
    state.roles = value
  }
}
