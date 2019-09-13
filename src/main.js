import Vue from 'vue'
import App from './App.vue'
import './common/scss/index.scss'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

fastclick.attach(document.body)
Vue.use(VueLazyLoad,{
  loading: require('./assets/default.png')
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
