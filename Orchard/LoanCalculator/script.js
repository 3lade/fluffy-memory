
function Calculate(event){

    event.preventDefault();

    const loanAmount=parseFloat(document.getElementById("loanAmount").value);
    const interestRate=parseFloat(document.getElementById("interestRate").value);
    const loanTerm=parseFloat(document.getElementById("loanTerm").value);

    const interest=(interestRate/100)/12;
    const dinominator=1-Math.pow((1+interest),-(loanTerm*12));
    const monthlyPayment=(loanAmount*interest)/dinominator;

    const monthlyPay=document.getElementById("monthlyPayment");
    const error=document.getElementById("error");

    if(loanAmount>0 && interestRate>0 && loanTerm>0) {
        
        document.getElementById("monthlyPayment").innerHTML=`<p><strong>Monthly Payment: ${monthlyPayment}</strong></p>`;
    }
    else {
        
        document.getElementById("error").innerHTML=`<p>Please enter valid positive numbers in all fields.<p>`;
        
    }
}
