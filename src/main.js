import Vue from 'vue'
import App from './App.vue'
import router from './router'
//css格式化
import './assets/css/normalize.css'
//引入自定义插件
import Plugin from './plugin'
Vue.use(Plugin)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
