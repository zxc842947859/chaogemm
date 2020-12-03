import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import router from '@/router'

import { removeLocal, getLocal } from '@/utils/local.js'

// 创建axios副本实例对象
const _fetch = axios.create({
  // 配置请求基地址
  baseURL: process.env.VUE_APP_URL
  //   withCredentials: true
})

// 挂载到vue上
Vue.prototype.$axios = _fetch

// 请求拦截器
_fetch.interceptors.request.use(
  config => {
    // 如果本次请求需要token在请求头中加入
    config.needToken &&
      (config.headers.authorization = `Bearer ${getLocal('token')}`)
    return config
  },
  error => {
    return Promise.reject(new Error(error))
  }
)

// 响应拦截器
_fetch.interceptors.response.use(
  response => {
    // 如果响应状态码为200 正常响应,正常执行then中回调并能获取到res
    if (response.data.code === 200) {
      return response
      // 有些接口我们不需要处理错误
    } else if (response.config.noError) {
      // 删除token
      removeLocal('token')
      // 中止.then
      return Promise.reject(new Error(response.data.message))
      // 如果状态码为401,403 跳转登录页
    } else if ([401, 403].includes(response.data.code)) {
      console.log(response)
      // 登录异常处理
      removeLocal('token') // 删除token
      store.commit('setLoginState', false) // 修改登录状态
      router.push(
        '/login' +
          (response.config.fullPath ? `?next=${response.config.fullPath}` : '')
      ) // 跳转登录界面
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

// 导出axios 副本实例对象
export default _fetch
