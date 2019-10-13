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

function setStatusOnToken(tbody, href) {

    console.log("setStatusOnToken", href);
    console.log(tbody);
    re = new RegExp(href);
    // console.log("href: ", href);
    for (var i = 0, row; row = tbody.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        //         console.log(row);
        for (var j = 0, col; col = row.cells[j]; j++) {
            //iterate through columns
            //columns would be accessed using the "col" variable assigned in the for loop
            if (col.children.length > 0) {
                // console.log("", col.children);
                if (col.children[0].tagName === "A") {
                    // console.log("Children[0]: ", col.children[0].href)
                    
                    if (col.children[0].href === href) {
                        console.log("Matches: ", col.children[0].href);
                        col.innerHTML ='';
                        // col.innerHTML = chrome.runtime.getURL("imgs/check.svg");
                    }

                }
            }
        }
    }
    // a = document.getElementsByTagName("a");
    // for (i = 0; i <= a.length; i++) {
    //     if (typeof a[i] !== 'undefined') {
    //         re = new RegExp(a[i].href);
    //         console.log(a[i].href);
    //         if (re.test(href)) {
    //             console.log("Found matching url:", href);
    //         }
    //     }
    // }
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
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                //    document.getElementById("demo").innerHTML = xhttp.responseText;
                // console.log("", xhttp);
                // console.log("Url: ", xhttp.url);
                setStatusOnToken(tbody, xhttp.url);
            }
        };
        for (i = 0; i < urls.length; i++) {
            console.log("URLS: " + urls[i]);
            xhttp.url = urls[i];
            xhttp.open("GET", urls[i], true);
            xhttp.send();
        }
        // if (options.reload) {
        //     if (options.noWarn != 2) {
        //         console.log("Warnings disabled - Page will auto reload.");
        //     }
        //     else {
        //         alert("All tokens cleared!\nPage will reload now.");
        //     }
        //     // location.reload()
        //     updateBtn.click();
        // }
        // else {
        //     if (options.noWarn != 2) {
        //         console.log("Warnings disabled - Please click Update.");
        //     }
        //     else {
        //         alert("All tokens cleared!\nPlease click Update.");
        //     }
        // }
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
