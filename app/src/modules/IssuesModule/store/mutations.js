import { Mutations } from './mutationTypes/index.ts'

export default {
  [Mutations.SET_ISSUES] (state, value) {
    state.issues = value
  }
}
