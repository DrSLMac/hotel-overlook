import './css/styles.css';
import './images/favicon-16x16.png';
import './images/room-view1.png';
import './images/room-view.png';
import { data } from "./apiCalls.js";
import { fetchData } from "./apiCalls.js";
import { postBooking } from "./apiCalls.js";
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
('.error-message');
// 🎛 Customer Dashboard 🎛
const dashboardPage = document.querySelector(".dashboard-page");
const welcomeMessage = document.querySelector(".customer-welcome");
const amountSpent = document.querySelector(".total-amount");
const allFutureBookings = document.querySelector(".future-grid");
const pastBookings = document.querySelector(".past-grid")
const newReservationButton = document.querySelector(".new-reservation-button")
const avaibleRoomsPage = document.querySelector(".available-rooms-page")
const backToDashboard = document.querySelector(".back-dash")
const roomTypeSelection = document.querySelector("#room-type-options")
const checkAvailButton = document.querySelector(".availability-button")
const bookingDate = document.getElementById("booking-date");
const roomType = document.getElementById("room-type")
const availableRoomsGrid = document.querySelector(".available-rooms-grid")
let bookRoomButtons = document.querySelector(".btn-box")
// bookRoomButton.addEventListener('click', buttonTest)

// 🌏 Global Variables 🌏
export let currentGuest;
export let futureBookings = [];
let allCustomersData;
let guests = [];
let allRoomsData;
let allBookingsData;
let customers;
let rooms;
let bookings;


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

Promise.all([data.customers, data.rooms, data.bookings])
    .then(results => {
        customers = results[0].customers;
        rooms = results[1].rooms;
        bookings = results[2].bookings;
    }).catch(error => console.log("Failed to retrieve needed data. Please reload the page"));
                            
// 🎧 Event Listeners 🎧
  window.addEventListener("load", () => {
    allCustomersFetch()
    allBookingsFetch()
    allRoomsFetch()
    getCurrentDate()
})
loginButton.addEventListener('click', login);
newReservationButton.addEventListener('click', makeNewReservationPage)
checkAvailButton.addEventListener('click', showAvailableRooms)
backToDashboard.addEventListener('click', () => {
    hide(avaibleRoomsPage)
    show(dashboardPage)
})


// 👇🏽👇🏽 Functions & Event Handlers 👋🏽 👇🏽👇🏽
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
            getTotalGuestExpenses()
            updateGuestAllBookingsContainer()
            getCurrentDate()
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
    // console.log('currentGuest ln 139: ', currentGuest)
    // console.log('expenses ln 140:,', expenses)
    amountSpent.innerText = `$${expenses}`
    // console.log('totalspent ln 145: ', expenses)
}

export function updateGuestAllBookingsContainer() {
    allFutureBookings.innerHTML = " ";
    pastBookings.innerHTML = " ";
    currentGuest.findPastBookings();
    currentGuest.roomsBooked.forEach(booking => {
        pastBookings.innerHTML += `
        <div tabindex="0" role="booking-tile-information" class="past-box booking-content">
        <p class="booking-id hidden">${booking.bookingId}</p>
        <p class="past-content">Room ${booking.roomNumber}</p>
        <p class="past-cost"> Cost $${booking.costPerNight}</p>
        <p class="past-content">${booking.dateOfStay}</p>
      </div>
        `
    });
    futureBookings.map(booking => {
        allFutureBookings.innerHTML += `
        <div class="future-box booking-content">
          <p class="booking-id hidden">${booking.bookingId}</p>
          <p class="future-content">Room ${booking.roomNumber}</p>
          <p class="future-content">${booking.date}</p>
    
          </div>
        </div>
      `;
    })
}

function getCurrentDate() {
    let today = new Date().toLocaleDateString()
    const splitDate = today.split("/")
    const reverseDate = splitDate.reverse()
    const joinDate = reverseDate.join("/")
    console.log('today: ', joinDate)
    return joinDate;
}

function makeNewReservationPage() {
    hide(loadingPage);
    hide(dashboardPage);
    show(avaibleRoomsPage);
}

function showAvailableRooms(event) {
    const dateParts = bookingDate.value.split("-");
    getCurrentDate()
    currentGuest.filterRooms(bookingDate, roomType);
    allRoomsData.filter(room => {
        if(roomType.value === room.roomType) {
            currentGuest.filteredBookings.push(room)
    availableRoomsGrid.innerHTML = " "
    currentGuest.filteredBookings.map((room) => {
        let userID = currentGuest.customerId;
        // console.log('room.number: ', room.number)
        // console.log('currentGuest: ', currentGuest.customerId)
        // console.log('bookingDate.value: ', bookingDate.value)
        availableRoomsGrid.innerHTML += `
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img class="available-photo" src="./images/room-view1.png" alt="A view from the door of a hotel room looking at a hotel bed">
            <p class="front-details">Room ${room.number}</p>
          </div>
          <div class="flip-card-back">
            <div class="room-details">
              <h1 class="room-type">${room.roomType}</h1>
              <p class="room-description">${room.numBeds} ${room.bedSize} Sized Bed</p>
              <p class="room-description">Bidet: ${room.bidet}</p>
              <p class="room-description">Price Per Night: $${room.costPerNight.toFixed(2)}</p>
            </div>
            <div onclick="postBooking(${userID}, ${dateParts[0]}, ${dateParts[1]}, ${dateParts[2]}, ${room.number});" class="btn-box"   id="book-button">
              <a href="#" class="btn">Book</a>
            </div>
          </div>
        </div>
      </div>
      `;

    }) 
} else {
        if(currentGuest.filteredBookings.length === 0) {
            availableRoomsGrid.innerHTML += `
            <h2 class="error-message">We're very sorry for the inconvenience.</h2>
            <h3 class="error-message">It appears that there are no rooms available on the date you have chosen.</h3>
            <h3 class="error-message">Please choose another day</h3> `
        }
        }
    })
}

window.postBooking = postBooking;

const show = (element) => {
    element.classList.remove("hidden");
}

const hide = (element) => {
    element.classList.add("hidden");
}