function startCountdown()
{
    const num=parseInt(document.getElementById("timeInput").value);
    const result=document.getElementById("countdownDisplay");

    if(isNaN(num) || num<=0 ||num==null)
    {
        result.innerHTML=`<p style="color:red;">Valid number enter karo Bsdk</p>`
    }
    else{
        let remainingTime=num;
        result.innerHTML=remainingTime;

        const Countdown=setInterval(() => {
            remainingTime--;
            result.innerHTML=remainingTime;
            if(remainingTime<=0)
            {
                clearInterval(Countdown);
                result.innerHTML=`<p style="color:Red;">TimesUp mf!</p>`
            }
        }, 1000);
    }
}