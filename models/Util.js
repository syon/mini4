export default class Util {
  static copyToClipboard(string) {
    const tmp = document.createElement('div')
    const pre = document.createElement('pre')
    pre.style.webkitUserSelect = 'auto'
    pre.style.userSelect = 'auto'
    tmp.appendChild(pre).textContent = string
    const s = tmp.style
    s.position = 'fixed'
    s.right = '200%'
    document.body.appendChild(tmp)
    document.getSelection().selectAllChildren(tmp)
    const result = document.execCommand('copy')
    document.body.removeChild(tmp)
    return result
  }
}
