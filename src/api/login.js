import _fetch from './request.js'

function getAuCode (data) {
  return _fetch({
    url: '/au/code',
    method: 'post',
    data
  })
}

function getAuLogin (data) {
  return _fetch({
    url: '/au/login',
    method: 'post',
    data
  })
}

export { getAuCode, getAuLogin }
