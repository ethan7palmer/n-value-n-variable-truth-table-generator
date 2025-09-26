document.getElementById("generateBtn").addEventListener("click", function() {
    // Get input values
    const varsInput = document.getElementById("vars").value.split(",").map(v => v.trim());
    const valsInput = document.getElementById("vals").value.split(",").map(v => isNaN(v) ? v : Number(v));

    const container = document.getElementById("tableContainer");
    container.innerHTML = ""; // clear previous table or messages

    // Get the row count label element
    const rowCountLabel = document.getElementById("rowCountLabel");

    // Helper function to check uniqueness
    const isUnique = arr => new Set(arr).size === arr.length;

    // Validation
    if (!isUnique(varsInput)) {
        rowCountLabel.style.display = "none";
        container.innerHTML = "<p style='color:red;'>Error: Variable names must be unique.</p>";
        return;
    }

    if (!isUnique(valsInput)) {
        rowCountLabel.style.display = "none";
        container.innerHTML = "<p style='color:red;'>Error: Values must be unique.</p>";
        return;
    }

    const numVars = varsInput.length;
    const numVals = valsInput.length;

    let result = [];

    for (let i = 0; i < numVars; i++) {
        let col = [];
        const repeatTimes = Math.pow(numVals, i);
        const numRepeats = Math.pow(numVals, numVars - i - 1);

        for (let r = 0; r < numRepeats; r++) {
            for (let val of valsInput) {
                for (let t = 0; t < repeatTimes; t++) {
                    col.push(val);
                }
            }
        }
        result.push(col);
    }

    // Reverse to match Python logic
    result = result.reverse();

    // Transpose columns into rows
    const tableRows = [];
    for (let i = 0; i < result[0].length; i++) {
        const row = result.map(col => col[i]);
        tableRows.push(row);
    }

    // Display the table
    const table = document.createElement("table");

    // Header
    const header = document.createElement("tr");

    const thNumber = document.createElement("th");
    thNumber.textContent = "#";
    header.appendChild(thNumber);

    for (let v of varsInput) {
        const th = document.createElement("th");
        th.textContent = v;
        header.appendChild(th);
    }
    table.appendChild(header);

    // Rows
    for (let i = 0; i < tableRows.length; i++) {
        const row = tableRows[i];
        const tr = document.createElement("tr");

        // First cell is row number
        const tdNumber = document.createElement("td");
        tdNumber.textContent = i + 1;  // Row numbers start at 1
        tr.appendChild(tdNumber);

        // Other cells
        for (let val of row) {
            const td = document.createElement("td");
            td.textContent = val;
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    // Update and show the label after generating rows
    rowCountLabel.textContent = `Total Rows: ${tableRows.length}`;
    rowCountLabel.style.display = "block"; // Make it visible

    container.appendChild(table);
});
