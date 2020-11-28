import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/Login'
import Home from '@/views/home/Home'
import Company from '@/views/home/company/Company'
import Question from '@/views/home/question/Question'
import Find from '@/views/home/find/Find'
import Mine from '@/views/home/mine/Mine'
import MineInfo from '@/views/home/mine/MineInfo'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/home/mine',
      children: [
        {
          path: '/home/company',
          component: Company
        },
        {
          path: '/home/question',
          component: Question
        },
        {
          path: '/home/find',
          component: Find
        },
        {
          path: '/home/mine',
          component: Mine
        },
        {
          path: '/home/info',
          component: MineInfo
        }
      ]
    }
  ]
})

export default router
