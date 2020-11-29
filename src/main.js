import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import 'normalize.css'
import '@/style/font/iconfont.css'

import '@/style/main.css'
import CGNavBar from '@/components/CGNavBar'
import CGUploadFile from '@/components/CGUploadFile'

Vue.component('CGNavBar', CGNavBar)
Vue.component('CGUploadFile', CGUploadFile)

Vue.prototype.$baseURL = process.env.VUE_APP_URL

Vue.use(vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
