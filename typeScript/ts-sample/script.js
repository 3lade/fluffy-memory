document.addEventListener('DOMContentLoaded', function () {
    var guestName = document.getElementById('guest-name');
    var checkInDate = document.getElementById('check-in-date');
    var checkOutDate = document.getElementById('check-out-date');
    var roomType = document.getElementById('room-type');
    var addBtn = document.getElementById('add-reservation');
    var errorMsg = document.getElementById('error-message');
    var reservationList = document.getElementById('reservation-list');
    addBtn.addEventListener('click', function () {
        errorMsg.innerHTML = "";
        var name = guestName.value;
        var checkInRaw = checkInDate.value;
        var checkOutRaw = checkOutDate.value;
        var room = roomType.value;
        if (!name || !checkInRaw || !checkOutRaw || !room) {
            errorMsg.textContent = "Please fill out all fields with valid dates.";
        }
        var checkIndate = new Date(checkInRaw);
        var checkOutdate = new Date(checkOutRaw);
        var checkIn = checkIndate.toDateString();
        var checkOut = checkOutdate.toDateString();
        var li = document.createElement('li');
        li.textContent = "\n        Guest Name: ".concat(name, "\n        Check-in Date: ").concat(checkIn, "\n        Check-out Date: ").concat(checkOut, "\n        Room Type: ").concat(room, "\n        Duration: \n        ");
        reservationList.appendChild(li);
    });
});
