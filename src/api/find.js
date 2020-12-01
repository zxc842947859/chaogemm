import _fetch from './request.js'

function articlesTechnic (params) {
  return _fetch({
    url: '/articles/technic',
    params
  })
}

export { articlesTechnic }
