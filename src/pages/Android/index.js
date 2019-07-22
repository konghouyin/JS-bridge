// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import reset from '@/assets/reset.css'
import allScc from '@/assets/all.css'
import Vue from 'vue'
import App from '../App'
import router from '../router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

window.HN = new JSBridge(100, 5) // HN-->'H5-Native'
// 创建实例,设置交互队列长度，以及交互超时时间
HN.getSystemInfo({
    success: function(res, style){
        console.log(res)
        console.log(style)
    }
})
