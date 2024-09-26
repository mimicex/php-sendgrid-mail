const observerMultiTarget = async (targets, callback) =>
{
    return new Promise(() => {
        // 延遲載入圖片
        let observer = new IntersectionObserver((entries) => {
            let i     = 0,
                total = entries.length
            for(i; i < total; i++)
            {
                if (entries[i].isIntersecting > 0)
                {
                    observer.unobserve(entries[i].target)
                    callback(entries[i].target)
                }
            }

        }, { rootMargin : "100px 0px", threshold : [0, 0.25, 0.5, 0.75, 1] })
        let i     = 0,
            total = targets.length
            for(i; i < total; i++) observer.observe(targets[i])
    })
}
    
const lazyImage = async () =>
{
    return new Promise((resolve) => {
        ("IntersectionObserver" in window == 1) ? resolve() : ''
    }).then(() => {
        // 取得目載入的圖片
        let images = document.querySelectorAll('#lazy')
        // 延遲載入圖片
        observerMultiTarget(images, (target) => {
            target.src = (target.dataset.src == undefined) ? target.src : target.dataset.src
            target.removeAttribute('id')
            target.removeAttribute('style')
        })
    })
}

export { lazyImage }