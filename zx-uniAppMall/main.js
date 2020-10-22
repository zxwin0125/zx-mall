import Vue from 'vue'
import App from './App'

// 配置http
import http from './utils/https.js'

// 引用全局组件
import status from './components/status.vue'

Vue.config.productionTip = false

// 全局引入request方法
Vue.prototype.request = http
// 全局注册组件
Vue.component('page-status',status)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
