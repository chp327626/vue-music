import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload'
import { Toast } from 'vant';


import 'assets/iconfont/iconfont.css' //字体图标

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/img/fail.jpg'),
  loading:  require('./assets/img/loading.jpg'),
  attempt: 1
})
Vue.use(Toast)

Toast.setDefaultOptions({ duration: 3000 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
