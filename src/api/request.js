import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'

import { removeLocal } from '@/utils/local.js'
import store from '@/store'
import router from '@/router'

const _fetch = axios.create({
  baseURL: process.env.VUE_APP_URL
  //   withCredentials: true
})

// 挂载到vue上
Vue.prototype.$axios = _fetch

_fetch.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(new Error(error))
  }
)

_fetch.interceptors.response.use(
  response => {
    if (response.data.code === 200) {
      return response
    } else if ([401, 403].includes(response.data.code)) {
      // 登录异常处理
      removeLocal('token') // 删除token
      store.commit('setLoginState', false) // 修改登录状态
      router.push('/login') // 跳转登录界面
      // 结束then执行
      Toast.fail(response.data.message)
      return Promise.reject(new Error(response.data.message))
    } else {
      Toast.fail(response.data.message)
      return Promise.reject(new Error(response.data.message))
    }
  },
  error => {
    Promise.reject(new Error(error))
  }
)

export default _fetch
