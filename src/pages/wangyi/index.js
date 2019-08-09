// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/reset.css'
import '@/assets/all.css'
import '@/pages/public_module'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTouch from './components/swiper.js'
import store from './vuex/store.js'; //vuex

Vue.config.productionTip = false

window.HN = new JSBridge(10000) // HN-->'H5-Native'

Vue.directive("swiper", {
    bind: function(el, binding) {
        new VueTouch(el, binding, "swiper");
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})

// 创建实例,设置交互队列长度，以及交互超时
