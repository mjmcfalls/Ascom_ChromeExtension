
chrome.storage.sync.get({
    baseUrl: "",
    autoReload: false
}, function (items) {
    options = { url: items.baseUrl, reload: items.autoReload };
});

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (tab.url !== undefined && info.status == "complete") {
        chrome.tabs.query({ active: true, currentWindow: true, status: "complete" }, function (tabs) {
            urlRe = new RegExp(options.url);
            if (urlRe.test(tabs[0].url)) {
                chrome.tabs.sendMessage(tabs[0].id, { ping: true }, function (response) {
                    if (response.pong) {
                        chrome.tabs.executeScript(tab.id, {
                            file: 'js/clearButton.js'
                        });
                    }
                });
            }
        });
    }
});
