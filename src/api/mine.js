import _fetch from './request.js'
// import { getLocal } from '@/utils/local.js'

function auInfo () {
  return _fetch({
    url: '/au/info',
    needToken: true
    // headers: {
    //   authorization: `Bearer ${getLocal('token')}`
    // }
  })
}

export { auInfo }