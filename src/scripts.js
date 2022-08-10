import './css/styles.css';
import './images/favicon-16x16.png';
import './images/room-view1.png';
import './images/room-view.png';
import { bookTheRoom } from "./apiCalls.js";
import Customer from "./classes/Customer"

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
const checkAvailButton = document.querySelector(".availability-button")
const bookingDate = document.getElementById("booking-date");
const roomType = document.getElementById("room-type")
const availableRoomsGrid = document.querySelector(".available-rooms-grid")

// 🌏 Global Variables 🌏
export let currentGuest;
export let futureBookings = [];
let allCustomersData;
let guests = [];
let allRoomsData;
let allBookingsData;

// 🐕 Fetch Functions 🐕
function allCustomersFetch() {
    fetch(`http://localhost:3001/api/v1/customers`)
    .then(response => response.json())
    .then(data => {allCustomersData = data.customers
        getGuests()
    })
}

function allRoomsFetch() {
    fetch(`http://localhost:3001/api/v1/rooms`)
    .then(response => response.json())
    .then(data => {allRoomsData = data.rooms
    })
}

function allBookingsFetch() {
    fetch(`http://localhost:3001/api/v1/bookings`)
    .then(response => response.json())
    .then(data => {allBookingsData = data.bookings
    })
}
                            
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
            return guest
        } else {
            show(incorrectInputMessage)
        }
    })
};

function getTotalGuestExpenses() {
    currentGuest.findPastBookings();
    let expenses = currentGuest.getTotalSpent().toFixed(2)
    amountSpent.innerText = `$${expenses}`
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
        <p class="past-cost">Cost $${booking.costPerNight}</p>
        <p class="past-content">${booking.dateOfStay}</p>
      </div>
        `
    });
    futureBookings.map(futureBooking => {
        allFutureBookings.innerHTML += `
        <div tabindex="0" role="future-booking-tile-information" class="future-box booking-content">
          <p class="booking-id hidden">${futureBooking.bookingId}</p>
          <p class="future-content">Room ${futureBooking.roomNumber}</p>
          <p class="future-content">${futureBooking.date}</p>
    
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
    currentGuest.filterRooms(bookingDate, roomType);
    allRoomsData.filter(room => {
        if(roomType.value === room.roomType) {
            currentGuest.filteredBookings.push(room)
    availableRoomsGrid.innerHTML = " "
    currentGuest.filteredBookings.map((room) => {
        let userID = currentGuest.customerId;
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
            <div onclick="bookTheRoom(${userID}, ${dateParts[0]}, ${dateParts[1]}, ${dateParts[2]}, ${room.number});" class="btn-box"   id="book-button">
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

window.bookTheRoom = bookTheRoom;

const show = (element) => {
    element.classList.remove("hidden");
}

const hide = (element) => {
    element.classList.add("hidden");
}