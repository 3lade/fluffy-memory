function showGreeting(){
    const name=document.getElementById("name").value;
    const greeting=document.getElementById("greetingStyle").value;

    const result=document.getElementById("result");

    if(name==="")
    {
        result.innerHTML=`Please enter your name`;
    }
    else{
        result.innerHTML=`${greeting}, ${name}!`;
    }
}