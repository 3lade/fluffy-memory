function Calculate()
{
    const loanAmount=parseFloat(document.getElementById("loanAmount").value);
    const interestRate=parseFloat(document.getElementById("interestRate").value);
    const loanTerm=parseFloat(document.getElementById("loanTerm").value);

    const result=document.getElementById("monthlyPayment");

    const IR=((interestRate/100)/12)
    const totalPayments=loanTerm*12
    const denominator=1-Math.pow((1+IR),-totalPayments)
    const MonthlyPay=((loanAmount*IR)/denominator).toFixed(2)

    if(isNaN(loanAmount) || loanAmount<=0 || isNaN(interestRate) || isNaN(loanTerm))
    {
        result.innerHTML=`<p><strong>Please enter valid positive numbers for inputs.</strong></p>`
    }
    else{
        result.innerHTML=`Monthly Payment: ${MonthlyPay}`;
    }
}