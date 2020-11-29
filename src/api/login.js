import _fetch from './request.js'

// 获取短信验证码
function getAuCode (data) {
  return _fetch({
    url: '/au/code',
    method: 'post',
    data
  })
}

// 登录
function getAuLogin (data) {
  return _fetch({
    url: '/au/login',
    method: 'post',
    data
  })
}

export { getAuCode, getAuLogin }
