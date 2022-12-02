import user from './store'
import { mapGetters } from 'vuex'
export default {
  install (Vue, options) {
    options.store.registerModule('user', user)

    Vue.mixin({
      computed: {
        ...mapGetters('user', [
          '$userName',
          '$userID',
          '$roles'
        ])
      }
    })
  }
}
