function getTokenUrls() {
    tokenHrefs = []
    reRevokeToken = /revokeToken/i;
    a = document.getElementsByTagName("a");

    for (i = 0; i <= a.length; i++) {
        if (typeof a[i] !== 'undefined') {
            if (reRevokeToken.test(a[i].href)) {
                // console.log(a[i]);
                tokenHrefs.push(a[i].href);
            }
        }
    }
    return tokenHrefs;
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
function getUpdateUrl() {
    btnPurple = document.getElementsByClassName("button purple")
    if (btnPurple.length == 1) {
        btnPurple[0].h
    }
}

function clearTokens() {
    tbody = document.getElementsByClassName("table sortable")[0].getElementsByTagName('tbody')[0];
    urls = getTokenUrls();
    r = confirm("This will clear all tokens and log the user out!\n\nAre you sure?");
    if (r) {
        var xhttp = new XMLHttpRequest();
        for (i = 0; i < urls.length; i++) {
            // console.log("URLS: " + urls[i]);
            xhttp.open("GET", urls[i], true);
            xhttp.send();
        }
        if (options.reload) {
            alert("All tokens cleared!\nPage will reload now.");
            location.reload()
        }
        else {
            alert("All tokens cleared!\nPlease click update or reload the page to see changes.");
        }
    }
}

chrome.storage.sync.get({
    baseUrl: "",
    autoReload: false
}, function (items) {
    options = { url: items.baseUrl, reload: items.autoReload };
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
