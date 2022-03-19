import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VCalendar from 'v-calendar'
import './styles/style.scss'
import './validation'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VCalendar, {
  componentPrefix: 'vc'
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
