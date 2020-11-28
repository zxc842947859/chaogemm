import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/Login'
import Home from '@/views/home/Home'
import Company from '@/views/home/company/Company'
import Question from '@/views/home/question/Question'
import Find from '@/views/home/find/Find'
import Mine from '@/views/home/mine/Mine'

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
      children: [
        {
          path: 'company',
          component: Company
        },
        {
          path: 'question',
          component: Question
        },
        {
          path: 'find',
          component: Find
        },
        {
          path: 'mine',
          component: Mine
        }
      ]
    }
  ]
})

export default router
