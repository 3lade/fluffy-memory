const Convert=()=>
{
    const inputValue=document.getElementById("inputValue").value;
    const direction=document.getElementById("direction");
    const result=document.getElementById("result");
    const error=document.getElementById("error");
    let inchConvert=(inputValue/2.54);
    let CMConvert=(inputValue*2.54);
    if(isNaN(inputValue))
    {
        document.getElementById("error").innerHTML=`<p>Please enter a value number and select direction.</p>`;
  
    }
    if(direction.value=="cm-to-in")
    {
        document.getElementById("result").innerHTML=`<p>Result: ${inchConvert.toFixed(2)} inches</p>`;
    }
    else if(direction.value=="in-to-cm"){
        document.getElementById("result").innerHTML=`<p>Result: ${CMConvert.toFixed(2)} cms</p>`
    }
}