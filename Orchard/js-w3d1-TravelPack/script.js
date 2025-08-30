document.getElementById("add-button").addEventListener('click', () => {
    const itemName = document.getElementById("item-name").value;
    const itemQty = parseInt(document.getElementById("item-qty").value);
    const ul = document.querySelector(".item-card");
    const result = document.getElementById("packing-list");

    if (!itemName || itemQty <= 0 || isNaN(itemQty)) {
        result.innerHTML = 'No action is taken; the form is ignored silently.';
        return;
    }
    let li = document.createElement("li");
    li.textContent = `${itemQty} x ${itemName}`
    ul.append(li);

    document.getElementById("item-name").value = "";
    document.getElementById("item-qty").value = "";
});

