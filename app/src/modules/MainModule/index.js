import routes from './routes'
import main from '@/modules/MainModule/store'
export default {
  install (Vue, options) {
    options.store.registerModule('main', main)
    options.router.addRoutes(routes)
    options.router.options.routes = options.router.options.routes.concat(routes)
  }
}
