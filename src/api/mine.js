import _fetch from './request.js'
// import { getLocal } from '@/utils/local.js'

// 获取用户信息
function auInfo () {
  return _fetch({
    url: '/au/info',
    needToken: true
    // headers: {
    //   authorization: `Bearer ${getLocal('token')}`
    // }
  })
}

// 修改用户信息
function auEdit (data) {
  return _fetch({
    url: '/au/edit',
    method: 'post',
    needToken: true,
    data
  })
}

export { auInfo, auEdit }
