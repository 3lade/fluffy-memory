const Calculate = () => {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const result = document.getElementById("result");

   if(!startDate || !endDate) 
   {
    result.innerHTML=`Please enter both start and end dates`
   }
   else{
    const startday=new Date(startDate);
    const endday=new Date(endDate);

    let counter=0;
    const currentDate=new Date(startday);
    while(currentDate<=endday)
    {
        const day=currentDate.getDay();
        if(day!==0 && day!==6)
        {
            counter++;
        }
        currentDate.setDate(currentDate.getDate()+1);
    }
    result.innerHTML=`Number of business days: ${counter}`;
   }
}