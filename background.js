
targetUrl = "ascommh.msj.org";
urlRe = new RegExp(targetUrl);
insertScript = false
chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (tab.url !== undefined && info.status == "complete") {
        chrome.tabs.query({ active: true, currentWindow: true, status: "complete" }, function (tabs) {
            if (urlRe.test(tabs[0].url)) {
                console.log("Url: " + tabs[0].url);
                console.log("Regex: {}" + urlRe);
                console.log("Regex Results: {}" + urlRe.test(tabs[0].url));
                console.log(tabs);
                chrome.tabs.sendMessage(tabs[0].id, { ping: true }, function (response) {
                    console.log("Pong: " + response.pong);
                    insertScript = true;
                    if (response.pong) {
                        chrome.tabs.executeScript({
                            file: 'clearButton.js'
                        });
                    }
                });


                // });
            }

        });
    }
});