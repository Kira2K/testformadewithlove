import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions.ts'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
