function findPattern()
{
    const input=document.getElementById("sentences").value;
    const pattern=document.getElementById("pattern").value;
    const result=document.getElementById("result");

    const regex=new RegExp(pattern,"gi");
    const matches=input.match(regex);

    if(pattern=="")
    {
        result.innerHTML=`<strong>Please enter a pattern to search for.<strong>`
    }
    else{
        result.innerHTML=`Pattern found ${matches?.length?matches.length:0} time(s).`;
    }
}