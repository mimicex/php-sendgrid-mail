import worker from './_worker.js?raw'

const initWorker = async (name) =>
{
    return new Promise((resolve) => {

        const blob     = new Blob([worker], { type: 'application/javascript' }),
              workUrl  = window.URL.createObjectURL(blob),
              location = window.location

        let mcWorker = new Worker(workUrl)

        mcWorker.postMessage({ cmd : name })

        function fn(e)
        {
            if (e.data.cmd == `${name}Callback`) resolve(e.data)
        }
        mcWorker.addEventListener('message', fn)
    })
}
export default (name, data) => 
{
    return initWorker(name, data)
}