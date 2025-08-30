function replacePattern(event)
{
    event.preventDefault();
    const inputText=document.getElementById("inputText").value;
    const pattern=document.getElementById("pattern").value;
    const replacementValue=document.getElementById("replacementValue").value;

    const result=document.getElementById("modifiedText");

    if(inputText=="" || pattern=="" || replacementValue=="")
    {
        result.innerHTML=`<strong>All fields are required.</strong>`
        return;
    }

    const regExp=new RegExp(pattern, "gi")

    const output=inputText.replace(regExp, replacementValue)

    result.textContent=output;

}