import Vue from 'vue'
import Router from 'vue-router'

import Register from '@/components/Register'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Home from '@/components/body/home'

import UserInfo from '@/components/user/UserInfo'

Vue.use(Router)

export default new Router({
  base: 'lightcampus',
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/user/info',
      name: 'userInfo',
      component: UserInfo
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
