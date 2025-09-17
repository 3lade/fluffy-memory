
export {};

interface Task {
    id: number,
    title: string,
    completed: boolean,
}

let tasks: Task[] = [];
let TaskIdCount = 0;

const taskForm = document.getElementById('taskForm') as HTMLFormElement;
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;
const taskCount = document.getElementById('taskCount') as HTMLDivElement;

const renderTasks = ():void => {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.textContent = "<p>No tasks added yet.</p>"
    }

    tasks.forEach((task, index) => {

        const li = document.createElement('li');
        li.className = "task-item";

        const taskTitle = document.createElement('span');
        taskTitle.textContent = `${task.title} ${index + 1}`
        taskTitle.className = task.completed ? 'completed' : "";
        taskTitle.style.cursor = "pointer"
        taskTitle.addEventListener('click', () => toggleTaskEvent(task.id))

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent="Delete";
        deleteBtn.addEventListener('click', () => deleteTask(task.id) )

        li.appendChild(taskTitle);
        li.appendChild(deleteBtn);

        taskList.append(li);
    })
    // taskCount.textContent = `${tasks.length}`
    taskCount.textContent = tasks.length.toString();
}

const toggleTaskEvent = (taskId:number) => {
    const task = tasks.find((item) => item.id === taskId)
    if(task)
    {
        task.completed = !task.completed;
    }
    renderTasks();
}

const addTasks = (taskTitle: string) => {
    const newTask: Task = {
        id: TaskIdCount,
        title: taskTitle,
        completed: false,
    }
    tasks.push(newTask);
    renderTasks();
}

const deleteTask = (taskId: number) => {
    const id = tasks.findIndex((item) => item.id === taskId)

    if(id !== -1)
    {
        tasks.splice(id, 1);
    }
    renderTasks();
}

document.addEventListener('DOMContentLoaded', () => {

    renderTasks();

    taskForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        const taskTitle = taskInput.value;

        if(taskTitle) {

            addTasks(taskTitle);
            taskInput.value = "";

        }

    })

})