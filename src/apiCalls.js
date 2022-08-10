import Booking from "./classes/Booking.js";
import { futureBookings, updateGuestAllBookingsContainer } from "./scripts.js";

// 📬 POST Function📬
const bookTheRoom = (userID, year, month, day, roomNumber) => {
    fetch("http://localhost:3001/api/v1/bookings", {
        method: "POST",
        body: JSON.stringify({
            userID: userID,
            date: `${year}/${month}/${day}`,
            roomNumber: roomNumber
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })  .then(response => response.json())
        .then(data => {
            let guestBooking = new Booking(data.newBooking)
console.log('guestBooking: ', guestBooking)
            futureBookings.push(guestBooking)
console.log('futureBookings: ', futureBookings)
            updateGuestAllBookingsContainer()
            console.log("Booking added successfully!")
        })
        .catch(error => console.log("Booking not added successfully"))
};

export { bookTheRoom }

