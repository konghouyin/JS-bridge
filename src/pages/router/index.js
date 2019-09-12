import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: function(resolve){
            require(['@/components/index'], resolve)
        }
    }, {
        path: '/show',
        name: 'show',
        component: function(resolve){
            require(['@/components/show'], resolve)
        }
    }, {
        path: '*',
        name: 'index',
        component: function(resolve){
            require(['@/components/index'], resolve)
        }
    }]
})
