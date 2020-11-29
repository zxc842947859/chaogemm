// 获取
function getLocal (key) {
  return window.localStorage.getItem(key)
}
// 设置
function setLocal (key, value) {
  window.localStorage.setItem(key, value)
}
// 删除
function removeLocal (key) {
  window.localStorage.removeItem(key)
}

export { getLocal, setLocal, removeLocal }
