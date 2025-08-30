// Scope & Hoisting demo (example)
console.log(hoistedVar); // undefined (var is hoisted but not initialized)
var hoistedVar = "I am hoisted!"; //

// IIFE (Immediately Invoked Function Expression) for demonstrating lexical scope
(function() {
    const privateVar = "I am private!";
    // console.log(hoistedVar); // Accessible due to global scope
})();
// console.log(privateVar); // ReferenceError: privateVar is not defined (demonstrates lexical scope)


// Variables
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

let tasks = []; // Array to store tasks

// Functions
const addTask = () => { // Arrow function
    const taskText = taskInput.value.trim(); //  Trim whitespace from the input

    if (taskText === "") { // Conditional to prevent empty tasks
        window.alert("Task cannot be empty!"); // BOM: window.alert
        return;
    }

    const newTask = {
        id: Date.now(), // Generate a unique ID
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    renderTasks();
    taskInput.value = ""; // Clear the input field
};

const renderTasks = () => {
    taskList.innerHTML = ""; // Clear previous tasks

    tasks.forEach((task) => { // Loop through tasks and display dynamically
        const listItem = document.createElement('li');
        listItem.dataset.id = task.id; // Store ID for easy access

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskComplete(task.id)); // Event Listener

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;
        if (task.completed) {
            taskTextSpan.classList.add('completed'); // Add a class for styling completed tasks
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id)); // Event Listener

        listItem.appendChild(checkbox);
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
};

const toggleTaskComplete = (id) => {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
};

const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) { // BOM: window.confirm
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }
};

const clearCompletedTasks = () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
};

// Simulate saving tasks to a server using Promises and async/await
const saveTasksToServer = async (data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Saving tasks to server:", data);
            resolve("Tasks saved successfully!");
        }, 1000); // Simulate network delay
    });
};

const handleSave = async () => {
    const response = await saveTasksToServer(tasks); // async/await
    console.log(response);
};

// Event Listeners
addTaskBtn.addEventListener('click', addTask); 
taskInput.addEventListener('keypress', (event) => { // Using an arrow function as event handler
    if (event.key === 'Enter') {
        addTask();
    }
});
clearCompletedBtn.addEventListener('click', clearCompletedTasks);


// Initial render when the page loads
renderTasks();
