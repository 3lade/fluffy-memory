const addPetBtn=document.getElementById("addPetBtn");
addPetBtn.addEventListener('click', ()=>
{
    const petName=document.getElementById("petName");
    const Species=document.getElementById("species");
    const Age=document.getElementById("age");
    const vaccinated=document.getElementById("vaccinated");

    const error=document.getElementById("error-message");

    const name=petName.value;
    const species=Species.value;
    const age=parseInt(Age.value);
    const vaccine=vaccinated.checked;

    if(!name || !species || isNaN(age) || age<=0 || !vaccine)
    {
        error.textContent="Enter valid values."
    }

    const type = (vaccine) ? "Vaccinated" : "Not-Vaccinated";

    const tableBody=document.getElementById("tableBody");
    const newRow=tableBody.insertRow();

    newRow.insertCell(0).textContent=name;
    newRow.insertCell(1).textContent=species;
    newRow.insertCell(2).textContent=age;
    newRow.insertCell(3).textContent=type;
    const action=newRow.insertCell(4);

    tableBody.append(newRow);

    const deleteBtn=document.createElement('button');
    deleteBtn.innerHTML="Delete";
    deleteBtn.className="deleteBtn";
    deleteBtn.addEventListener('click', ()=>
    {
        newRow.remove();
    })
    newRow.append(deleteBtn);


    const editBtn=document.createElement('button');
    editBtn.innerHTML="Edit";
    editBtn.className="editBtn";
    editBtn.addEventListener('click', ()=>
    {
        petName.value=newRow.cells[0].textContent;
        Species.value=newRow.cells[1].textContent;
        Age.value=newRow.cells[2].textContent;
        vaccinated.value=newRow.cells[3].textContent==="Vaccinated";

        newRow.remove();
    })
    newRow.append(editBtn);
})

const searching=document.getElementById("searching")

function searchOperation()
{
    const searchValue=searching.value.toLowerCase();
    
}