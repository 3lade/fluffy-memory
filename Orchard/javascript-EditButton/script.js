let records = []; // Array to store the data

const showFormBtn = document.getElementById("showFormBtn");
const showTableBtn = document.getElementById("showTableBtn");
const formSection = document.getElementById("formSection");
const tableSection = document.getElementById("tableSection");

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const dataForm = document.getElementById("dataForm");
const tableBody = document.getElementById("tableBody");

// Function to switch between form and table display
function showContent(contentType) {
    // Hide both sections first
    formSection.style.display = "none";
    tableSection.style.display = "none";

    // Deactivate both buttons
    showFormBtn.classList.remove("active");
    showTableBtn.classList.remove("active");

    if (contentType === 'form') {
        formSection.style.display = "block"; // Show the form
        showFormBtn.classList.add("active");
    } else if (contentType === 'table') {
        tableSection.style.display = "block"; // Show the table
        showTableBtn.classList.add("active");
        renderTable(); // Ensure the table is rendered when shown
    }
}

// Function to render the table data
function renderTable() {
    tableBody.innerHTML = ""; // Clear existing rows

    if (records.length === 0) {
        const row = tableBody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 4; // Span across all columns
        cell.textContent = "No data available. Use the form to add records.";
        cell.style.textAlign = "center";
        cell.style.color = "#888";
        return;
    }

    records.forEach((record, index) => {
        const row = tableBody.insertRow();

        row.insertCell().textContent = record.id;
        row.insertCell().textContent = record.name;
        row.insertCell().textContent = record.email;

        const actionsCell = row.insertCell();
        actionsCell.className = "action-buttons";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteData(index);
        actionsCell.appendChild(deleteButton);
    });
}

// Function to Add new data
function addData(event) {
    event.preventDefault(); // Prevent default form submission

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name === "" || email === "") {
        alert("Please enter both name and email.");
        return;
    }

    const newRecord = {
        id: records.length > 0 ? Math.max(...records.map(r => r.id)) + 1 : 1, // Generate a unique ID
        name: name,
        email: email
    };
    records.push(newRecord);

    clearForm();
    renderTable();
    showContent('table'); // Show the table after adding new data
}

// Function to delete data
function deleteData(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        records.splice(index, 1);
        renderTable();
        // If the table is currently hidden, showing it might be useful
        if (tableSection.style.display === "none") {
            showContent('table');
        }
    }
}

// Function to clear the form fields
function clearForm() {
    nameInput.value = "";
    emailInput.value = "";
}

// Event listener for form submission
dataForm.addEventListener("submit", addData);

// Optional: Pre-populate some data for demonstration
records.push({ id: 1, name: "Alice Wonderland", email: "alice@example.com" });
records.push({ id: 2, name: "Bob The Builder", email: "bob@example.com" });
renderTable(); // Render the initial table data (it will be hidden until "Show Data Table" is clicked)

// No call to showContent() on initial load, only heading and buttons will be visible.
