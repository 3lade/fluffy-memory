function handleSubmit(event) {
    const form = document.getElementById("expenceForm");
    event.preventDefault();

    document.getElementById("nameError").textContent = '';
    document.getElementById("dateError").textContent = "";
    document.getElementById("categoryError").textContent = "";
    document.getElementById("amountError").textContent = "";
    document.getElementById("radioError").textContent = "";
    document.getElementById("checkboxError").textContent = "";

    const name=document.getElementById("name").value.trim();
    const date=document.getElementById("date").value;
    const catagory=document.getElementById("category").value.trim();
    const amount=parseInt(document.getElementById("amount").value);
    const radioBtn=document.querySelector("input[type='radio']:checked");
    const confirmation=document.getElementById("confirmation").ariaChecked;

    

}