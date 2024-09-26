const requestsText = (url) => 
{
    return new Promise((resolve) => {
        fetch(url, {
            cache: 'no-cache', 
            method: 'GET',
            mode: 'cors',
            redirect: 'follow'
        }).then((response) => {
            return response.text()
        }).then((response) => resolve(response))
    })
}

const getValue = (r) => 
{
    return new Promise((resolve) => {
        const url = 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Noto+Sans+TC:wght@200;300;400;500;600;700&family=Noto+Serif+TC:wght@200;300;400;500;600;700&display=swap'
        requestsText(url, r.data).then((res) => resolve(res))
    })
}
self.addEventListener('message', (e) => {
    getValue(e.data).then((r) => self.postMessage ({ cmd: `${e.data.cmd}Callback`, msg : r }))
}, false)