import Vue from 'vue'
import axios from 'axios'

const _fetch = axios.create({
  baseURL: process.env.VUE_APP_URL
  //   withCredentials: true
})

Vue.prototype.$axios = _fetch

export default _fetch
