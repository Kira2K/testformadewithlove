import routes from './routes'
import store from '@/modules/IssuesModule/store'
export default {
  install (Vue, options) {
    options.store.registerModule('kanban', store)
    options.router.addRoutes(routes)
    options.router.options.routes = options.router.options.routes.concat(routes)
  }
}
