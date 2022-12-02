import { Mutations } from './mutationTypes'

export default {
  [Mutations.SET_PROGRESS] (state, value) {
    state.progress = value
  }
}
