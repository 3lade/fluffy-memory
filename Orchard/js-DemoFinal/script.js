const addBtn=document.getElementById("addPetBtn");
addBtn.addEventListener('click', ()=>
{
    const petName=document.getElementById("petName");
    const Species=document.getElementById("species");
    const Age=document.getElementById("age");
    const vaccinated=document.getElementById("vaccinated");
    const error=document.getElementById("error-message");

    const name=petName.value;
    const species=Species.value;
    const age=parseInt(Age.value);
    const selectVaccine=vaccinated.checked;
    
    if(!name || !species || isNaN(age) || age<=0)
    {
        error.textContent="Enter valid input"
    }

    const type=(selectVaccine) ? "Vaccinated" : "Not Vaccinated";

    const tableBody=document.getElementById("tableBody");

    const newRow=tableBody.insertRow();
    newRow.insertCell(0).textContent=name;
    newRow.insertCell(1).textContent=species;
    newRow.insertCell(2).textContent=age;
    newRow.insertCell(3).textContent=type;
    const action=newRow.insertCell(4);

    const editBtn=document.createElement('button');
    editBtn.innerHTML="Edit";
    editBtn.addEventListener('click', ()=>
    {
        petName.value=newRow.cells[0].textContent;
        Species.value=newRow.cells[1].textContent;
        Age.value=newRow.cells[2].textContent;
        vaccinated.checked=newRow.cells[3].textContent==="Vaccinated";

        newRow.remove();
    })
    newRow.append(editBtn);

    const deleteBtn=document.createElement('button');
    deleteBtn.innerHTML="Delete";
    deleteBtn.addEventListener('click', ()=>
    {
        newRow.remove();
    })
    newRow.append(deleteBtn);

    tableBody.append(newRow);

    petName.value="";
    Species.value="";
    Age.value="";
    vaccinated.checked=false;

})

function searchOperation()
{
    const search=document.getElementById("searching").value.toLowerCase();
    const rows=document.querySelectorAll("#tableBody tr");

    rows.forEach((row)=>
    {
        const names=row.cells[0].textContent.toLowerCase();
        row.style.display=names.includes(search) ? '':'none';
    })
}