chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.ping) {
        // console.log("Received Ping");
        // 

        sendResponse({ pong: true });

    }
});