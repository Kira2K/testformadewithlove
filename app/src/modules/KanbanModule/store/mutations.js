import { Mutations } from './mutationTypes'

export default {
  [Mutations.SET_STAGES] (state, value) {
    state.stages = value
  }
}
