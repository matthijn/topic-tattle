export async function requestPermission() {
    return Notification.requestPermission()
}

export function sendNotification(title, body, icon, onClick) {
    const notification = new Notification(title, { body, icon });
    notification.onclick = onClick
}
