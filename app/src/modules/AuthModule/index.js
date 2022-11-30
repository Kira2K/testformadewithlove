import auth from './store'
import routes from './routes'
import config from './config.json'

import { mapGetters } from 'vuex'

export default {
  install (Vue, options) {
    options.router.addRoutes(routes)
    options.store.registerModule('auth', auth)
    setInterval(() => options.store.dispatch('auth/actuallyTokenUpdate'), 1000)
    options.store.subscribeAction({
      error: (action, state, error) => {
        if (error.message.includes(401) && action.type !== 'auth/validate') {
          localStorage.setItem('backward', location.href)
          options.store.dispatch('auth/denyAccess')
        }
      }
    })
    options.store.subscribeAction({
      error: (action, state, error) => {
        if (action.type === 'auth/validate') {
          options.store.dispatch('auth/access', { refreshToken: options.store.getters['auth/$refreshToken'] || '' })
        }
      }
    })
    options.store.subscribeAction((action) => {
      if (action.type === 'auth/denyAccess') {
        if (options.router.currentRoute.path !== config.logoutRedirect) {
          location.href = config.logoutRedirect
        }
      }
    })
    options.store.dispatch('auth/validate')
    Vue.mixin({
      computed: {
        ...mapGetters('auth', [
          '$accessToken',
          '$refreshToken',
          '$expAccessTime',
          '$session'
        ])
      }
    })
  }
}
