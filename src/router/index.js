import Vue from 'vue'
import Router from 'vue-router'

import Register from '@/components/Register'
Vue.use(Router)

export default new Router({
  base: 'lightcampus',
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register
    }
  ]
})
