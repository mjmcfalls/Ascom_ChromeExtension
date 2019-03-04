// Saves options to chrome.storage
function save_options() {
    console.log("Save_options function");
    var url = document.getElementById('baseurl').value;
    var reloadState = document.getElementById('autoReload').checked;
    chrome.storage.sync.set({
        baseUrl: url,
        autoReload: reloadState
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        baseUrl: "",
        autoReload: false
    }, function (items) {
        document.getElementById('baseurl').value = items.baseUrl;
        document.getElementById('autoReload').checked = items.autoReload;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
var saveBtn = document.getElementById('saveBtn');
if (saveBtn) {
    console.log("Adding saveBtn Event listener");
    saveBtn.addEventListener('click', save_options);
}
