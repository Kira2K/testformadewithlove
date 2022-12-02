import ui from './store'
import { mapGetters, mapActions } from 'vuex'

export default {
  install (Vue, options) {
    options.store.registerModule('ui', ui)
    Vue.mixin({
      computed: {
        ...mapGetters('ui', [
          '$languages',
          '$theme',
          '$soundOn',
          '$lang'
        ]),
        $routes ():[] {
          return options.router.options.routes
        },
        $appName ():string {
          return process.env.VUE_APP_NAME
        }
      },
      methods: {
        ...mapActions(['$setShowServerError', '$setTextShowServerError', '$decreaseRequestCount', '$increaseRequestCount'])
      }
    })
  }
}
