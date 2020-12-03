import _fetch from './request.js'

// 获取用户信息
function auInfo (bol = false) {
  return _fetch({
    url: '/au/info',
    needToken: true,
    noError: bol // true: 不希望处理错误
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

// 上传头像
function uploadIcon (data) {
  return _fetch({
    url: '/upload',
    method: 'post',
    needToken: true,
    data
  })
}

export { auInfo, auEdit, uploadIcon }
