import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  mutations: {
    initialiseStore (state) {
      // Check if the ID exists
      if (localStorage.getItem('store')) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    }
  }
})
store.subscribe((mutation, state) => {
  if (mutation.type !== 'initialiseStore') {
    console.log(mutation, state)
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state))
  }
})
export default store
