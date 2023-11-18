import {requestPermission, sendNotification} from "../lib/notifications";
import {get, store} from "../lib/storage";

const permissionsShown = "permissionsShown"

export function notifyOfMessageInTopic(message, topic) {
    const title = `${message.username} in ${topic.title}`
    sendNotification(title, message.content, message.avatarUrl, function() {
        document.location.href = `${topic.url}#${message.id}`
    })
}

export async function showPermissionIfNeeded() {
    if ((await get(permissionsShown))) {
        return
    }

    const element = buildPermissionElement()
    document.body.appendChild(element)
}

function buildPermissionElement() {
    const element = document.createElement("div")
    const s = element.style
    s.backgroundColor = "rgb(161, 18, 54)"
    s.color = "white";
    s.width = "300px"
    s.borderRadius = "10px"
    s.position = "fixed"
    s.top = "100px"
    s.left = "calc(50% - 150px)"
    s.zIndex = 99999;
    s.cursor = "pointer"
    s.padding = "20px";
    s.textAlign = "center"

    element.innerHTML = "<h2>Topic Tattle</h2><p>Topic Tattle would like to send notifications</p>"

    element.addEventListener("click", async function() {
        await requestPermission()
        await store(permissionsShown, true)
        element.parentElement.removeChild(element)
    })

    return element
}