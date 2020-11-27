import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: '', // 用户信息
    isLogin: false // 用户是否登录
  },
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
  actions: {},
  modules: {}
})
