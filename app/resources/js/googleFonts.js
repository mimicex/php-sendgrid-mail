//
// googleFonts.mjs
//
// @todo ： 透過 service worker postmessage 取得檔案
//
const _initCss = async (res) => 
{
    return new Promise((resolve) => {
        resolve(res.msg.replace(/}/g, 'font-display: swap; }'))
    }).then((css) => {
        let head  = document.getElementsByTagName('head')[0],
            style = document.createElement('style')
        style.appendChild(document.createTextNode(css))
        head.appendChild(style)
    })
}
import post from './worker.js'

export default () => 
{
    return new Promise(() => post('fonts', {}).then((res) => _initCss(res)))
}