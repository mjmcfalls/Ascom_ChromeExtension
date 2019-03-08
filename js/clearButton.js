function getTokenUrls() {
    tokenHrefs = []
    reRevokeToken = /revokeToken/i;
    a = document.getElementsByTagName("a");

    for (i = 0; i <= a.length; i++) {
        if (typeof a[i] !== 'undefined') {
            if (reRevokeToken.test(a[i].href)) {
                tokenHrefs.push(a[i].href);
            }
        }
    }
    return tokenHrefs;
}

function getUpdateButton() {
    updateUsrBtns = document.getElementsByName("updateUser")
    if (updateUsrBtns.length == 1) {
        return updateUsrBtns;
    }
}

function insertClearButtonRow(tbody) {
    a = document.createElement('a');
    span = document.createElement("span");
    spanText = document.createTextNode("Clear All")
    span.appendChild(spanText);
    a.appendChild(span);
    a.setAttribute("Title", "Clear all tokens");
    a.setAttribute("class", "button red tiny");
    a.setAttribute("id", "clearAllBtn");
    cells = []
    newRow = tbody.insertRow(tbody.rows.length);
    for (i = 0; i < tbody.rows[0].cells.length; i++) {
        cells.push(newRow.insertCell(0));
    }
    cells[0].appendChild(a);
}


function clearTokens() {
    updateBtn = getUpdateButton();
    tbody = document.getElementsByClassName("table sortable")[0].getElementsByTagName('tbody')[0];
    urls = getTokenUrls();
    if (options.noWarn == 0) {
        console.log("Warnings disabled!");
        r = true;
    }
    else {
        r = confirm("This will clear all tokens and log the user out!\n\nAre you sure?");
    }

    if (r) {
        var xhttp = new XMLHttpRequest();
        for (i = 0; i < urls.length; i++) {
            console.log("URLS: " + urls[i]);
            xhttp.open("GET", urls[i], true);
            xhttp.send();
        }
        if (options.reload) {
            if (options.noWarn != 2) {
                console.log("Warnings disabled - Page will auto reload.");
            }
            else {
                alert("All tokens cleared!\nPage will reload now.");
            }
            // location.reload()
            updateBtn.click();
        }
        else {
            if (options.noWarn != 2) {
                console.log("Warnings disabled - Please click Update.");
            }
            else {
                alert("All tokens cleared!\nPlease click Update.");
            }
        }
    }
}

chrome.storage.sync.get({
    baseUrl: "",
    autoReload: false,
    noWarn: false,
}, function (items) {
    options = { url: items.baseUrl, reload: items.autoReload, noWarn: items.noWarn };
});

authTbl = document.getElementsByClassName("table sortable")

if (authTbl.length == 1) {
    if (document.getElementById("clearAllBtn")) { }
    else {
        tbody = document.getElementsByClassName("table sortable")[0].getElementsByTagName('tbody')[0];
        insertClearButtonRow(tbody);
        document.getElementById("clearAllBtn").addEventListener("click", clearTokens);
    }
}
