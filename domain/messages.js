import {defaultParser} from "./message-parsers";

export function mapDOMMessage(domElement, parsers) {
    const d = (p) => domElement.querySelector(p)

    return {
        id: parseInt(domElement.dataset.messageId),
        ...mapMessageHeader(d(".messageheader")),
        ...mapMessagePoster(d(".avatar")),
        ...mapMessagePost(d(".post"), parsers),
    }
}

function mapMessageHeader(domElement) {
    const dateElement = domElement.querySelector("[data-shortdate]");
    return {
        date: dateElement.dataset.shortdate
    }
}

function mapMessagePoster(domElement) {
    const d = (p) => document.querySelector(p)

    return {
        username: d(".username a").innerHTML,
        avatarUrl: d(".thumb img").src
    }
}

function mapMessagePost(domElement, parsers = []) {
    const contentElement = domElement.querySelector(".messagecontent")

    for (const parser of parsers) {
        const content = parser(domElement)
        if (content) {
            return { content }
        }
    }

    return defaultParser(domElement)
}