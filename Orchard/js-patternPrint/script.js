const pattern = () => {
    const num = document.getElementById("numAsterisks").value;
    const patternOutput = document.getElementById("patternOutput");

    patternOutput.textContent="";
    
    if (isNaN(num) || num<=0){
        patternOutput.innerHTML=`<p style="color:red;">The number of rows should be greater than 0</p>`
    }
    else {
        
        let pattern = "";
        for (let i = 0; i < parseInt(num); i++) {
            for (let j = 0; j <= i; j++) {
                pattern += "*";
            }
            pattern += "\n"
        }
        patternOutput.append(pattern);
    }
}