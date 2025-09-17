document.addEventListener('DOMContentLoaded', ()=> {
    const guestName = document.getElementById('guest-name') as HTMLInputElement;
    const checkInDate = document.getElementById('check-in-date') as HTMLInputElement;
    const checkOutDate = document.getElementById('check-out-date') as HTMLInputElement;
    const roomType = document.getElementById('room-type') as HTMLSelectElement;
    const addBtn = document.getElementById('add-reservation') as HTMLButtonElement;
    const errorMsg = document.getElementById('error-message') as HTMLDivElement;
    const reservationList = document.getElementById('reservation-list') as HTMLDivElement;

    addBtn.addEventListener('click', () => {

        errorMsg.innerHTML = "";

        const name = guestName.value;
        const checkInRaw = checkInDate.value;
        const checkOutRaw = checkOutDate.value;
        const room = roomType.value;

        if(!name  || !checkInRaw || !checkOutRaw || !room )
        {
            errorMsg.textContent = "Please fill out all fields with valid dates."
        }

        const checkIndate = new Date(checkInRaw);
        const checkOutdate = new Date(checkOutRaw)

        const checkIn = checkIndate.toDateString();
        const checkOut = checkOutdate.toDateString()


        const li = document.createElement('li');
        li.textContent = `
        Guest Name: ${name}
        Check-in Date: ${checkIn}
        Check-out Date: ${checkOut}
        Room Type: ${room}
        Duration: 
        `

        reservationList.appendChild(li);
        
    })
})