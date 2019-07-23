import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import show from '@/components/show'
import getSystemInfo from '@/components/getSystemInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/show',
      name: 'show',
      component: show
    },{
      path: '*',
      name: 'index',
      component: index
    }
  ]
})
