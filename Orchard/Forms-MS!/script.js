document.addEventListener('DOMContentLoaded', ()=>
{
    const dataForm=document.getElementById("dataForm");
    const dataTable=document.getElementById("dataTable");

    const errorMsg=document.createElement('p');
    errorMsg.textContent='The Table is Empty';
    errorMsg.id='errorMessage';
    dataTable.parentElement.insertBefore(errorMsg, dataTable);

    const toggleEmptyMessage =()=>
    {
        const hasRows=dataTable.querySelectorAll('tr').length>0;
        errorMsg.style.display=hasRows ? 'none' : 'block';
    };

    document.addEventListener('submit',(event)=>
    {
        event.preventDefault();

        const Inputname=document.getElementById("name");
        const Inputage=document.getElementById("age");
        const Inputcity=document.getElementById("city");

        const name=Inputname.value;
        const age=Inputage.value;
        const city=Inputcity.value;


        const tr=document.createElement('tr');

        const tdName=document.createElement('td');
        const tdAge=document.createElement('td');
        const tdCity=document.createElement('td');

        tdName.textContent=name;
        tdAge.textContent=age;
        tdCity.textContent=city;

        tr.append(tdName);
        tr.append(tdAge);
        tr.append(tdCity);


        dataTable.append(tr);
        toggleEmptyMessage();


        
        const removeBtn=document.createElement('button');
        removeBtn.innerHTML=`Remove Data`
        removeBtn.addEventListener('click', ()=>
        {
            tr.remove();
            toggleEmptyMessage();
        })
        tr.append(removeBtn);


        Inputname.value="";
        Inputage.value="";
        Inputcity.value="";

    });
    toggleEmptyMessage();
});