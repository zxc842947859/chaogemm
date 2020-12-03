import _fetch from './request.js'

// 获取面试技巧列表数据
function articlesTechnic (params) {
  return _fetch({
    url: '/articles/technic',
    params
  })
}

// 获取市场薪资数据
function chartDataHot () {
  return _fetch({
    url: '/chart-data/hot'
  })
}

// 面经列表
function articlesShare (params) {
  return _fetch({
    url: '/articles/share',
    params
  })
}

// 面经搜索
function articlesShareTopSearch () {
  return _fetch({
    url: '/articles/shareTopSearch'
  })
}

// 面试技巧搜索
function articlesTechnicTopSearch () {
  return _fetch({
    url: '/articles/technicTopSearch'
  })
}

// 面试技巧详情
function articlesTechnicInfo (id) {
  return _fetch({
    url: `/articles/technic/${id}`
  })
}

// 面经详情
function articlesShareId (id) {
  return _fetch({
    url: `/articles/share/${id}`
  })
}

// 获取面经评论
function articlesCommentsId (id, params) {
  return _fetch({
    url: `/articles/comments/${id}`,
    params
  })
}

// 发表评论
function articlesComments (data, fullPath) {
  return _fetch({
    url: '/articles/comments',
    method: 'post',
    needToken: true,
    data,
    fullPath
  })
}
export {
  articlesTechnic,
  chartDataHot,
  articlesShare,
  articlesShareTopSearch,
  articlesTechnicTopSearch,
  articlesTechnicInfo,
  articlesCommentsId,
  articlesShareId,
  articlesComments
}
