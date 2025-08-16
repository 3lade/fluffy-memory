const pattern = () => {
    const num = document.getElementById("numRows").value;
    const patternOutput = document.getElementById("patternOutput");

    patternOutput.textContent="";
    if (isNaN(num) || num <= 0) {
        patternOutput.innerHTML = `<p style="color:red;">The number of rows should be greater than 0</p>`;
    }
    else {
        let pattern = "";
        for (let i = 1; i <= parseInt(num); i++) {
            for (let j = 1; j <= i; j++) {
                pattern += (j);
            }
            pattern += ("\n");
        }
        patternOutput.append(pattern);
    }
}