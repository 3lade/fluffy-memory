var tasks = [];
var TaskIdCount = 0;
var taskForm = document.getElementById('taskForm');
var taskInput = document.getElementById('taskInput');
var taskList = document.getElementById('taskList');
var taskCount = document.getElementById('taskCount');
var renderTasks = function () {
    taskList.innerHTML = "";
    tasks.forEach(function (task, index) {
        var li = document.createElement('li');
        li.className = "task-item";
        var taskTitle = document.createElement('span');
        taskTitle.textContent = "".concat(task.title, " ").concat(index + 1);
        taskTitle.className = task.completed ? 'completed' : "";
        taskTitle.style.cursor = "pointer";
        taskTitle.addEventListener('click', function () { return toggleTaskEvent(task.id); });
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', function () { return deleteTask(task.id); });
        li.appendChild(taskTitle);
        li.appendChild(deleteBtn);
        taskList.append(li);
    });
    taskCount.textContent = "".concat(tasks.length);
};
var toggleTaskEvent = function (taskId) {
    var task = tasks.find(function (item) { return item.id === taskId; });
    if (task) {
        task.completed = !task.completed;
    }
    renderTasks();
};
var addTasks = function (taskTitle) {
    var newTask = {
        id: TaskIdCount,
        title: taskTitle,
        completed: false,
    };
    tasks.push(newTask);
    renderTasks();
};
var deleteTask = function (taskId) {
    var id = tasks.findIndex(function (item) { return item.id === taskId; });
    if (id !== -1) {
        tasks.splice(id, 1);
    }
    renderTasks();
};
document.addEventListener('DOMContentLoaded', function () {
    renderTasks();
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var taskTitle = taskInput.value;
        if (taskTitle) {
            addTasks(taskTitle);
            taskInput.value = "";
        }
    });
});
