const verify = (event) => {
    event.preventDefault();
    console.log("hello");
    const from = document.getElementById("from").value;
    const To = document.getElementById("to").value;
    const Date = document.getElementById("date").value;
    const errorMessage=document.getElementById("message");
    console.log(errorMessage);
    if(from=="" || To=="" || Date=="")
    {
        
        errorMessage.innerHTML=`<p>Please fill in all fields.</p>`;
    }
    else{
        return;
    }
}
