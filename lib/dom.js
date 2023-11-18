export function watchForNewNodes(parentNodeSelector, selector, callback) {
    const parentNode = document.querySelector(parentNodeSelector)
    if (!parentNode) {
        return
    }

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes) {
                for (const node of mutation.addedNodes) {
                    if (node.matches(selector)) {
                        console.log("New node", node)
                        callback(node)
                    }
                }
            }
        })
    })

    observer.observe(parentNode, { childList: true, subtree: true })

    return observer
}