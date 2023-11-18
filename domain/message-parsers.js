export function defaultParser(domElement) {
    const cleaned = cleanedElement(domElement)
    return { content: cleaned.innerText }
}

function cleanedElement(domElement) {
    // Removes quotes from the message so we are not displaying those in the notification.
    const cleaned = domElement.cloneNode(true)
    const quotes = cleaned.querySelectorAll("blockquote")
    for (const quote of quotes) {
        quote.parentNode.removeChild(quote)
    }

    return cleaned
}