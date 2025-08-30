const errorMsg = document.getElementById("error-message");
const petList = document.getElementById("petList");

const addBtn = document.getElementById("addPetBtn");
addBtn.addEventListener('click', () => {
    const petName = document.getElementById("petName").value;
    const species = document.getElementById("species").value;
    const age = document.getElementById("age").value;
    const vaccinated = document.querySelector("#vaccinated").checked;

    if (!petName || !species || !age) {
        errorMsg.innerHTML = 'Please fill out all required fields!';
        return;
    }

    const vaccinatedText = vaccinated ? "Yes" : "No"; //as the custom return of Checked is True or False

    const li = document.createElement('li');
    li.innerHTML = `${petName} - Species: ${species}, Age: ${age}, Vaccinated: ${vaccinatedText}`;
    petList.append(li);
});