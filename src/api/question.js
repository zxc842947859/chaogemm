import _fetch from './request.js'

function interviewFilters () {
  return _fetch({
    url: '/interview/filters'
  })
}

export { interviewFilters }
