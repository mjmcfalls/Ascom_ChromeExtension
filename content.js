chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.ping) {
        console.log("Received Ping");

        sendResponse({ pong: true });

        return;
    }
    /* Content script action */
    console.log("Ping successful");
});