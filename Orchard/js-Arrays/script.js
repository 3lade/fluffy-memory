function Analyze()
{
    const num=document.getElementById("numberList").value;
    const result=document.getElementById("listAnalysis");

    const arr=num.split(",");

    const array=[];
    for(let i=0;i<arr.length;i++)
    {
        array.push(parseInt(arr[i]));
    }

    let valid=true;

    let largest=array[0];
    let smallest=array[0];
    let sum=0;
    for(let i=0;i<array.length;i++)
    {
        if(isNaN(array[i]))
        {
            valid=false;
        }
        if((array[i])>largest)
        {
            largest=array[i];
        }
        if((array[i])<smallest)
        {
            smallest=array[i];
        }
        sum=sum+array[i];
    }
    // for(let i=0;i<array.length;i++)
    // {
        
    // }
    if(valid){
    result.innerHTML=`
    Entered List: ${array}
    Largest Number: ${largest}
    Smallest Number: ${smallest}
    Sum: ${sum}`;
    }
    else{
    result.innerHTML=`
    Entered List: ${arr}
    Largest Number: NaN
    Smallest Number: NaN
    Sum: NaN`;
    }
}
