var taskName = document.getElementById('task');
var priorityName = document.getElementById('priority');
var addBtn = document.getElementById('addTaskBtn');
var errorMsg = document.getElementById('error-message');
var taskList = document.getElementById('task-list');
addBtn.addEventListener('click', function () {
    var task = taskName.value;
    var priority = priorityName.value;
    if (!task || !priority) {
        errorMsg.textContent = 'Please enter a task and select a priority';
        return;
    }
    var li = document.createElement('li');
    li.textContent = "".concat(task, " [").concat(priority, "] - ");
    var btn = document.createElement('button');
    btn.textContent = 'Mark as Complete';
    btn.addEventListener('click', function () {
        btn.textContent = 'Completed';
        btn.disabled = true;
    });
    li.append(btn);
    taskList.append(li);
});
