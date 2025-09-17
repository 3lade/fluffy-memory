// exports {}

// interface Task {
//     name: string,
//     priority: string
// }

// const taskName = document.getElementById('task') as HTMLInputElement;
// const priorityName = document.getElementById('priority') as HTMLSelectElement;
// const addBtn = document.getElementById('addTaskBtn') as HTMLButtonElement;
// const errorMsg = document.getElementById('error-message') as HTMLDivElement;
// const taskList = document.getElementById('task-list') as HTMLDivElement;

// addBtn.addEventListener('click', () => {
//     const task = taskName.value;
//     const priority = priorityName.value;

//     if(!task || !priority)
//     {
//         errorMsg.textContent = 'Please enter a task and select a priority';
//         return;
//     }

//     const li = document.createElement('li');
//     li.textContent = `${task} [${priority}] - `
    
//     const btn = document.createElement('button');
//     btn.textContent = 'Mark as Complete';
//     btn.addEventListener('click', ()=> {
//         btn.textContent = 'Completed';
//         btn.disabled = true;
//     })

//     li.append(btn);
//     taskList.append(li);
// })

