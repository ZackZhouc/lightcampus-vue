import Vue from 'vue'
import Router from 'vue-router'

import Register from '@/components/Register'
import Main from '@/components/Main'

import Home from '@/components/body/home'
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
      component: Main,
      children: [
        {name: 'Home', path: 'home', component: Home}
      ]
    }
  ]
})
