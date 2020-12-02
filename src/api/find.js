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

export { articlesTechnic, chartDataHot, articlesShare, articlesShareTopSearch }
