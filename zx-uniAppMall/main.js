import Vue from 'vue'
import App from './App'

// 配置http
import http from './utils/https.js'

Vue.config.productionTip = false
// 全局引入request方法
Vue.prototype.request = http

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
