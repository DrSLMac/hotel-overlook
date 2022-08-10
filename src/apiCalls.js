import Booking from "./classes/Booking.js";
import { currentGuest, futureBookings, updateGuestAllBookingsContainer } from "./scripts.js";
// import { updatGuestAllBookingsContainer } from "./scripts.js"

// 🐕 Fetch Functions 🐕
const fetchData = (data) => fetch(`http://localhost:3001/api/v1/${data}`)
            .then(response => response.json());


const postBooking = (userID, year, month, day, roomNumber) => {
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
            // currentGuest.filteredRooms.splice(currentGuest.filteredRooms.indexOf(guestBooking), 1)
            updateGuestAllBookingsContainer()
            console.log("Booking added successfully!")
        })
        .catch(error => console.log("Booking not added successfully"))
};

const data ={
    customers: fetchData("customers"),
    rooms: fetchData("rooms"),
    bookings: fetchData("bookings")
};

export { data }
export { fetchData }
export { postBooking }




export const getAllData = (id) => {
    return Promise.all([
        getDetailsData('customers'),
        getCustomerData(id)
    ]);
};

