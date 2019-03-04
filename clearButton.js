function getTokenUrls(table) {
    for (var i = 0, row; row = table.rows[i]; i++) {
        console.log("Row href: " + row.cells[3]);
        link = row.cells[3].data;
        console.log(link);
    }
}

console.log("Injected clearButton.js")
authTbl = document.getElementsByClassName("table sortable")


a = document.createElement('a');
span = document.createElement("span");
spanText = document.createTextNode("Clear All")
span.appendChild(spanText);

a.appendChild(span);
a.setAttribute("Title", "Clear all tokens");
a.setAttribute("href", "#");
a.setAttribute("class", "button red tiny");
a.setAttribute("id", "clearAllBtn");

if (authTbl.length == 1) {
    if (document.getElementById("clearAllBtn")) { }
    else {
        tbody = document.getElementsByClassName("table sortable")[0].getElementsByTagName('tbody')[0];
        urls = getTokenUrls(tbody);
        // tbody.rows[0].cells.length
        cells = []
        newRow = tbody.insertRow(tbody.rows.length);
        for (i = 0; i < tbody.rows[0].cells.length; i++) {
            cells.push(newRow.insertCell(0));
        }
        console.log(cells);
        // newText = document.createTextNode(clearButton);
        cells[0].appendChild(a);
    }

}
