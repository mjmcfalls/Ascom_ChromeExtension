chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.ping) {
        sendResponse({ pong: true });
    }
});