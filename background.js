

insertScript = false;
options = null;

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
                // console.log("Url: " + tabs[0].url);
                // console.log("Regex: {}" + urlRe);
                // console.log("Regex Results: {}" + urlRe.test(tabs[0].url));
                // console.log(tabs);
                // console.log("Options: " + options);
                chrome.tabs.sendMessage(tabs[0].id, { ping: true }, function (response) {
                    // console.log("Pong: " + response.pong);
                    insertScript = true;
                    if (response.pong) {
                        chrome.tabs.executeScript(tab.id, {
                            file: 'clearButton.js'
                        });
                    }
                });
            }
        });
    }
});