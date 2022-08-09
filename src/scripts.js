import './css/styles.css';
import './images/favicon-16x16.png';

import getDetailsData from './apiCalls';

import Customer from "./classes/Customer"
import Room from "./classes/Room"
import Booking from "./classes/Booking"
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 👇🏽👇🏽 Document Query Selectors 👇🏽👇🏽

// ⭐️ Log In Page ⭐️
const loadingPage = document.querySelector(".loading-page");
const username = document.querySelector('.username-input');
const password = document.querySelector('.password-input');
const loginButton = document.querySelector('.login-button');
const incorrectInputMessage = document.querySelector
('.incorrect-login-input');
// 🎛 Customer Dashboard 🎛
const dashboardPage = document.querySelector(".dashboard-page");
const welcomeMessage = document.querySelector(".customer-welcome");
const amountSpent = document.querySelector(".total-amount");
const futureBookings = document.querySelector(".future-grid");
const pastBookings = document.querySelector(".past-grid")
const newReservationButton = document.querySelector(".new-reservation-button")

// 🌏 Global Variables 🌏
let allCustomersData;
let guests = [];
let currentGuest;
let allRoomsData;
let allBookingsData;
let roomNumber;
let chosenDate;


// 🐕 Fetch Functions 🐕
function allCustomersFetch() {
    fetch(`http://localhost:3001/api/v1/customers`)
    .then(response => response.json())
    .then(data => {allCustomersData = data.customers
        // console.log('allCustomersData ln 49: ', allCustomersData)
        getGuests()
    })
}

function allRoomsFetch() {
    fetch(`http://localhost:3001/api/v1/rooms`)
    .then(response => response.json())
    .then(data => {allRoomsData = data.rooms
        // console.log('rooms data ln 65: ', allRoomsData)
    })
}

function allBookingsFetch() {
    fetch(`http://localhost:3001/api/v1/bookings`)
    .then(response => response.json())
    .then(data => {allBookingsData = data.bookings
        // console.log('allBookingsdata ln 64: ', allBookingsData)
    })
}

// function addNewReservationPost() {
    //     fetch(`http://localhost:3001/api/v1/bookings`, {
        //         method: "POST",
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify({
            //             userID: currentGuest.id,
            //             date: SelectedDate,
            //             roomNumber: roomNumber
            //         })
            //     })
            //     .then(response => {
                //         if (!response.ok) {
                    //             throw new Error('There was an error in booking your reservation. We apologize for the inconvenience. Please try again.')
                    //         } else {
                        //             errorMessage.innerHTML = ''
                        //             return response.json()
                        //         }
                        //     })
                        //     .then(() => allBookingsFetch())
                        //     .catch(err => {
                            //         errorMessage.innerHTML = `${err.message}`
                            //     })
                            // }
                            
// 🎧 Event Listeners 🎧
  window.addEventListener("load", () => {
   // getCurrentDate();
    allCustomersFetch()
    allRoomsFetch()
    allBookingsFetch()
})
loginButton.addEventListener('click', login);
newReservationButton.addEventListener('click', showAvailableRooms)


// 👇🏽👇🏽 Functions & Event Handlers 👇🏽👇🏽
function getGuests() {
    allCustomersData.forEach(guest => {
    guests.push(new Customer(guest))
    })
};

function updateBookingData(bookingsData, roomsData) {
    guests.forEach(guest => {guest.getHotelRoomDetails(bookingsData, roomsData)
    })
}

function greetGuest(guest) {
// console.log('guest ln 78: ', guest.name)
    welcomeMessage.innerText = `Welcome Back, ${guest.name}!`
}

function login(e) {
    e.preventDefault();
    return guests.find(guest => {
        if(guest.username === username.value && password.value === 'overlook2021') {
            hide(loadingPage)
            show(dashboardPage)
            greetGuest(guest)
            updateBookingData(allBookingsData, allRoomsData)
            currentGuest = guest
            guest.findPastBookings()
console.log('currentGuest ln 122: ', guest.findPastBookings())
            getTotalGuestExpenses()
            console.log('getTotalGuestExpenses: ln 126', getTotalGuestExpenses())
            updateGuestAllBookingsContainer()
            // showRoomOptions()
            return guest
        } else {
            show(incorrectInputMessage)
        }
    })
};

function getTotalGuestExpenses() {
    currentGuest.findPastBookings();
    let expenses = currentGuest.getTotalSpent().toFixed(2)
    console.log('currentGuest ln 139: ', currentGuest)
    console.log('expenses ln 140:,', expenses)
    amountSpent.innerText = `$${expenses}`
    console.log('totalspent ln 145: ', expenses)
}

function updateGuestAllBookingsContainer() {
    futureBookings.innerHTML = " ";
    pastBookings.innerHTML = " ";
    currentGuest.findPastBookings();
    console.log('currentGuest.findPastBookings(): ', currentGuest.findPastBookings());
    currentGuest.roomsBooked.forEach(booking => {
        console.log('booking ln 150: ', booking)
        pastBookings.innerHTML += `
        <div class="past-box booking-content">
        <p class="booking-id hidden">${booking.bookingId}</p>
        <p class="past-content">Room ${booking.roomNumber}</p>
        <p class="past-cost"> Cost $${booking.costPerNight}</p>
        <p class="past-content">${booking.dateOfStay}</p>
      </div>
        `
    })
}


function showAvailableRooms() {
    hide(loadingPage);
    hide(dashboardPage)
}

const show = (element) => {
    element.classList.remove("hidden");
}

const hide = (element) => {
    element.classList.add("hidden");
}


// function postApiData(url, data) {
//     fetch(url, {
//         method: 'POST', headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     }).then(data => data.json()).then(data => {
//         console.log(data)
//         fetch(url)
//             .then(data => data.json())
//             .then(data => console.log(data))
//     })
//         .catch(error => console.log(error));
// }




//getDetailsData().then((data) => console.log(data))
//.catch((error) => console.log(error))

// const getCurrentDate = () => {
    //     let today = new Date().toLocaleDateString('en-US').split('/');
    //     today[0] = `0${today[0]}`;
    //     let year = today.pop();
    //     today.unshift(year);
    //     today = today.join("-");
    //     // bookingDate.setAttribute("value", today);//bookingDate is a query selector
    //     // bookingDate.setAttribute("min", today);
    // }
    // console.log('getCurrentDate: ', getCurrentDate())

