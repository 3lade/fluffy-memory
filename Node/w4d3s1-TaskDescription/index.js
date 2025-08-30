let tasks=[];

function addTask(taskDescription)
{
    if(typeof taskDescription !== 'string' || taskDescription.trim() === '' )
    {
        return "Invalid task description.";
    }
    let trimmed=taskDescription.trim();
    tasks.push(trimmed);
    return `Task added: ${trimmed}`
}

function listTasks()
{
    if(tasks.length===0)
    {
        return "No tasks available."
    }
    return tasks.map((task, index) => `${index + 1}. ${task}`).join('\n');
}

function resetTasks()
{
    tasks=[];
    return "All tasks have been cleared."
}

module.exports={
    addTask,
    listTasks,
    resetTasks
}