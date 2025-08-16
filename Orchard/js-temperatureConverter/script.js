const convertTemperature=()=>
{
    const temp=parseFloat(document.getElementById("temperature").value);
    const from=document.getElementById("fromUnit").value;
    const to=document.getElementById("toUnit").value;

    const result=document.getElementById("result");
    
    let ans=0;

    if(isNaN(temp) || temp=='')
    {
        result.innerHTML=`Enter the valid temperature`;
    }
    
    if(from=="Celsius")
    {
        celsius();
    }
    else if(from=="Kelvin")
    {
        kelvin();
    }
    else{
        faurenheit();
    }

    function celsius(){
        if(to=="Kelvin")
        {
            ans=temp+273.15;
            result.innerHTML=`Result: ${ans.toFixed(2)} ${to}`
        }
        else if(to=="Fahrenheit"){
            ans=(temp*(9/5))+32;
            result.innerHTML=`Result: ${ans.toFixed(2)} ${to}`
        }
    }
    function kelvin(){
        if(to=="Celsius")
        {
            ans=temp-273.15;
            result.innerHTML=`Result: ${ans.toFixed(2)} ${to}`
        }
        else if(to=="Fahrenheit"){
            ans=((temp-273.15)*9/5)+32;
            result.innerHTML=`Result: ${ans.toFixed(2)} ${to}`
        }
    }
    function faurenheit(){
        if(to=="Celsius")
        {
            ans=(temp-32)*5/9;
            result.innerHTML=`Result: ${ans.toFixed(2)} ${to}`
        }
        else if(to=="Kelvin"){
            ans=((temp-32)*5/9)+32;
            result.innerHTML=`Result: ${ans.toFixed(2)} ${to}`
        }
    }
}