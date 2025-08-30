function validateEmail()
{

    const email=document.getElementById("email").value;

    const result=document.getElementById("message");
    console.log(email)
    const emailRegex=/^[a-zA-Z0-9._%-+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(emailRegex.test(email))
    {
        result.innerHTML=`<p>Valid Email Address</p>`
        result.style.color="#2E873e"
    }
    else{
        result.innerHTML=`<p>Invalid Email Address </p>`
        result.style.color="#FF0000"
    }
}