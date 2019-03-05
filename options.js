function getRadioBtnValue() {
    radioBtns = document.getElementsByName("warnChoice");
    for (i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].checked) {
            return radioBtns[i].value;
        }
    }
}

function setRadioBtnActive(noWarn) {
    var radioBtns = document.getElementsByName("warnChoice");
    for (i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].value == noWarn) {
            // console.log("Checking radio button " + radioBtns[i].id);
            return radioBtns[i].id
        }
    }
}
// Saves options to chrome.storage
function save_options() {
    // console.log("Save_options function");
    var url = document.getElementById('baseurl').value;
    var reloadState = document.getElementById('autoReload').checked;
    var warnState = getRadioBtnValue();
    // console.log("Save Warn State: " + warnState);
    chrome.storage.sync.set({
        baseUrl: url,
        autoReload: reloadState,
        noWarn: warnState
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 1000);
    });
}
// Reset options
function reset_options() {
    // console.log("Save_options function");
    var url = "";
    var reloadState = false;
    var warnState = false;
    chrome.storage.sync.set({
        baseUrl: url,
        autoReload: reloadState,
        noWarn: 2
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options reset.';
        restore_options();
        setTimeout(function () {
            status.textContent = '';
        }, 1000);
    });
}
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        baseUrl: "",
        autoReload: false,
        noWarn: 2
    }, function (items) {
        document.getElementById('baseurl').value = items.baseUrl;
        document.getElementById('autoReload').checked = items.autoReload;
        var radioBtns = document.getElementsByName("warnChoice");
        document.getElementById(setRadioBtnActive(items.noWarn)).checked = true;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
var saveBtn = document.getElementById('saveBtn');
var resetBtn = document.getElementById("resetBtn");
if (saveBtn) {
    // console.log("Adding saveBtn Event listener");
    saveBtn.addEventListener('click', save_options);
}
if (resetBtn) {
    // console.log("Adding saveBtn Event listener");
    resetBtn.addEventListener('click', reset_options);
}
