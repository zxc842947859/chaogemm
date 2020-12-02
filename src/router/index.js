import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/views/login/Login'
import Home from '@/views/home/Home'
import Company from '@/views/home/company/Company'
import Question from '@/views/home/question/Question'
import Find from '@/views/home/find/Find'
import Mine from '@/views/home/mine/Mine'
import MineInfo from '@/views/home/mine/MineInfo'
import MineInfoEdit from '@/views/home/mine/MineInfoEdit'
import ShareList from '@/views/home/find/ShareList'
import { getLocal } from '@/utils/local.js'
import { auInfo } from '@/api/mine.js'

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
          component: Company,
          // 路由元信息
          meta: {
            needTabBar: true // 是否展示底部标签栏
          }
        },
        {
          path: '/home/question',
          component: Question,
          meta: {
            needLogin: true, // 是否需要登录状态
            needTabBar: true
          }
        },
        {
          path: '/home/find',
          component: Find,
          meta: {
            needTabBar: true
          }
        },
        {
          path: '/home/mine',
          component: Mine,
          meta: {
            needLogin: true,
            needTabBar: true
          }
        },
        {
          path: '/home/mineInfo',
          component: MineInfo,
          meta: {
            needLogin: true
          }
        },
        {
          path: '/home/infoEdit',
          component: MineInfoEdit,
          meta: {
            needLogin: true
          }
        },
        {
          path: '/home/shareList',
          component: ShareList,
          meta: {}
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // 如果不需要登录直接跳转
  if (!to.meta.needLogin || store.state.isLogin) {
    // 如果需要登录,并且当前是已登录状态,直接跳转
    next()
  } else if (getLocal('token')) {
    // 需要登录,但未登录,判断是否有token,有token获取用户信息
    try {
      const res = await auInfo()
      store.commit('setUserInfo', res.data.data)
      store.commit('setLoginState', true)
      next()
    } catch {}
  } else {
    // 要登录,但未登录,如果没有token跳转到登录
    router.push('/login?next=' + to.fullPath)
  }
})

export default router
