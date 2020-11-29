import Vue from 'vue'
import Vuex from 'vuex'

import { auInfo } from '@/api/mine.js'

// 挂载Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: '', // 用户信息
    isLogin: false // 用户是否登录
  },
  // 同步处理,也是VueX中修改数据的唯一方式
  mutations: {
    // 设置用户信息
    setUserInfo (state, value) {
      state.userInfo = value
    },
    // 设置用户登录状态
    setLoginState (state, value) {
      state.isLogin = value
    }
  },
  // 异步处理
  actions: {
    async refreshUserInfo (store) {
      // 获取用户信息
      const res = await auInfo()
      // 更新用户信息
      store.commit('setUserInfo', res.data.data)
      store.commit('setLoginState', true)
    }
  },
  modules: {}
})
