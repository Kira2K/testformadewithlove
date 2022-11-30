import * as types from './types/mutations.type'

export default {
  [types.SET_PROGRESS] (state, value) {
    state.progress = value
  }
}
