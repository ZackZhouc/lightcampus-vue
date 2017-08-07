import Vue from 'vue'
import Router from 'vue-router'

import Register from '@/components/Register'
import Main from '@/components/Main'
Vue.use(Router)

export default new Router({
  base: 'lightcampus',
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    }
  ]
})
