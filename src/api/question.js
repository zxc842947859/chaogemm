import _fetch from './request.js'

// 获取筛选条件
function interviewFilters () {
  return _fetch({
    url: '/interview/filters'
  })
}

// 获取面试题
function interviewQuestions (params) {
  return _fetch({
    url: '/interview/questions',
    needToken: true,
    params
  })
}

// 提交试题
function questionsSubmit (data) {
  return _fetch({
    url: '/questions/submit',
    method: 'post',
    needToken: true,
    data
  })
}

// 获取指定题
function questionsId (id) {
  return _fetch({
    url: '/questions/' + id,
    needToken: true
  })
}

export { interviewFilters, interviewQuestions, questionsSubmit, questionsId }
