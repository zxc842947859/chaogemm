import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/views/login/Login'
import Home from '@/views/home/Home'
import Company from '@/views/home/company/Company'
import Question from '@/views/home/question/Question'
import QuestionInfo from '@/views/home/question/QuestionInfo'
import Find from '@/views/home/find/Find'
import Mine from '@/views/home/mine/Mine'
import MineInfo from '@/views/home/mine/MineInfo'
import MineInfoEdit from '@/views/home/mine/MineInfoEdit'
import ShareList from '@/views/home/find/ShareList'
import TechnicList from '@/views/home/find/TechnicList'
import ShareInfo from '@/views/home/find/ShareInfo'
import TechnicInfo from '@/views/home/find/TechnicInfo'
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
        },
        {
          path: '/home/technicList',
          component: TechnicList,
          meta: {}
        },
        {
          path: '/home/shareInfo/:id',
          component: ShareInfo,
          meta: {}
        },
        {
          path: '/home/technicInfo/:id',
          component: TechnicInfo,
          meta: {}
        },
        {
          path: '/home/questionInfo',
          component: QuestionInfo,
          meta: {
            needLogin: true
          }
        }
      ]
    }
  ]
})

// 前置守卫
router.beforeEach(async (to, from, next) => {
  // 记录每个页面离开前滚动条的位置,存储到路由元中
  from.meta.top =
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    window.pageYOffset
  if (store.state.isLogin) {
    next()
  } else if (to.meta.needLogin && !getLocal('token')) {
    // 要登录,但未登录,如果没有token跳转到登录
    router.push('/login?next=' + to.fullPath)
  } else {
    // 不需要登录 有token // 不需要登录 没有token // 需要登录有token 有token
    // 如果需要登录,并且当前是已登录状态,直接跳转
    next()
    if (getLocal('token')) {
      const res = await auInfo(!to.meta.needLogin)
      store.commit('setUserInfo', res.data.data)
      store.commit('setLoginState', true)
    }
  }
})

// 后置守卫
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

const originalReplace = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalReplace.call(this, location).catch(err => err)
}

export default router
