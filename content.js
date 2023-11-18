import {topicInformation} from "./domain/topics";
import {notifyOfMessageInTopic, showPermissionIfNeeded} from "./domain/notifications";
import {watchForNewNodes} from "./lib/dom";
import {mapDOMMessage} from "./domain/messages";

showPermissionIfNeeded().catch(console.error)

const onNewMessageAppeared = (element) => notifyOfMessageInTopic(mapDOMMessage(element), topicInformation())
watchForNewNodes("#content", "[data-message-id]", onNewMessageAppeared)

const onNewMessageButtonAppeared = (element) => element.click()
watchForNewNodes("#content", "#newMessageNotification", onNewMessageButtonAppeared)