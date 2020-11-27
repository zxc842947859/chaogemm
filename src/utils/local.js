function getLocal (key) {
  return window.localStorage.getItem(key)
}

function setLocal (key, value) {
  window.localStorage.setItem(key, value)
}

function removeLocal (key) {
  window.localStorage.removeItem(key)
}

export { getLocal, setLocal, removeLocal }
