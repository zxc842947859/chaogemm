import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'

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
