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

export { articlesTechnic, chartDataHot }
