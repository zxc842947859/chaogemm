import _fetch from './request.js'

function getAuCode (data) {
  return _fetch({
    url: '/au/code',
    method: 'post',
    data
  })
}

export { getAuCode }
