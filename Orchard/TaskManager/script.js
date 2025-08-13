function Demo()
{
    let tasktitle=document.getElementById("task-title").value;
    let taskManage=document.getElementById("task-description").value;

    const message=document.getElementById("message");
    if(tasktitle.length==0||taskManage.length==0)
    {
        message.innerHTML=`Please fill in both fields.`;
    }
    else {
        const tasklist=document.getElementById("task-list");
        const val=document.createElement("div");
        val.innerHTML=`<strong>${tasktitle}</strong> <p>${taskManage}</p> <button  class="delete-btn" onclick="remove(event)">Delete</button>`;
        tasklist.appendChild(val);
    }
    
}
    
function remove(event)
{
    event.target.parentNode.remove();
}