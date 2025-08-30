let records = []; // Array to store the data
let editIndex = -1; // To keep track of the record being edited

const showFormBtn = document.getElementById("showFormBtn");
const showTableBtn = document.getElementById("showTableBtn");
const formSection = document.getElementById("formSection");
const tableSection = document.getElementById("tableSection");

const recordIdInput = document.getElementById("recordId"); // Hidden input for ID
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const addUpdateBtn = document.getElementById("addUpdateBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
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
        cell.textContent = "No data available. Fill the form to add records.";
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

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.onclick = () => editData(index);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteData(index);
        actionsCell.appendChild(deleteButton);
    });
}

// Function to Add or Update data
function addUpdateData(event) {
    event.preventDefault(); // Prevent default form submission

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name === "" || email === "") {
        alert("Please enter both name and email.");
        return;
    }

    if (editIndex === -1) { // Add new record
        const newRecord = {
            id: records.length > 0 ? Math.max(...records.map(r => r.id)) + 1 : 1, // Generate a unique ID
            name: name,
            email: email
        };
        records.push(newRecord);
    } else { // Update existing record
        records[editIndex].name = name;
        records[editIndex].email = email;
        editIndex = -1; // Reset edit index
        addUpdateBtn.textContent = "Add Data";
        cancelEditBtn.style.display = "none";
    }

    clearForm();
    renderTable();
    showContent('table'); // Show the table after adding/updating
}

// Function to edit data
function editData(index) {
    editIndex = index;
    const recordToEdit = records[index];
    nameInput.value = recordToEdit.name;
    emailInput.value = recordToEdit.email;
    addUpdateBtn.textContent = "Update Data";
    cancelEditBtn.style.display = "inline-block";
    showContent('form'); // Show the form for editing
}

// Function to delete data
function deleteData(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        records.splice(index, 1);
        renderTable();
        // If the table is currently hidden, showing it might be useful
        if (tableSection.style.display === "none") { // Changed from classList.contains("hidden")
            showContent('table');
        }
    }
}

// Function to clear the form fields
function clearForm() {
    recordIdInput.value = "";
    nameInput.value = "";
    emailInput.value = "";
    addUpdateBtn.textContent = "Add Data";
    cancelEditBtn.style.display = "none";
    editIndex = -1; // Reset edit index
}

// Function to cancel editing
function cancelEdit() {
    clearForm();
    showContent('form'); // Stay on the form, but in add mode
}

// Event listener for form submission
dataForm.addEventListener("submit", addUpdateData);

// Optional: Pre-populate some data for demonstration
records.push({ id: 1, name: "Alice Wonderland", email: "alice@example.com" });
records.push({ id: 2, name: "Bob The Builder", email: "bob@example.com" });
renderTable(); // Render the initial table data (it will be hidden until "Show Table" is clicked)

// No call to showContent() on initial load, only heading and buttons will be visible.
