export function topicInformation() {
    const url = document.location.href.split("#")[0];
    const id = parseInt(url.split("/list_message/")[1])

    return {
        url,
        id,
        title: document.querySelector("title").innerHTML
    }
}
