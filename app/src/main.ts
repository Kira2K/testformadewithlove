import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import UIModule from './modules/UIModule'
import MainModule from './modules/MainModule'
import IssuesModule from './modules/IssuesModule'
import KanbanModule from './modules/KanbanModule'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import vueKanban from 'vue-kanban'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })
Vue.use(vueKanban)
Vue.use(MainModule, { store, router })
Vue.use(IssuesModule, { store, router })
Vue.use(KanbanModule, { store, router })
Vue.use(UIModule, { store, router })

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
