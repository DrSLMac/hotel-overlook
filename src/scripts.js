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

// 🌏 Global Variables 🌏
let allCustomersData;
let guests = [];
let currentCustomer;
let allRoomsData;
let allBookingsData;
let roomNumber;
let chosedDate;

// 🎧 Event Listeners 🎧
window.addEventListener("load", () => {
    // getCurrentDate();
    allCustomersFetch()
    allRoomsFetch()
    allBookingsFetch()
console.log('allCustomersFetch() ln 38: ', allCustomersFetch())
})
loginButton.addEventListener('click', login);

// 🐕 Fetch Functions 🐕
function allCustomersFetch() {
    fetch(`http://localhost:3001/api/v1/customers`)
    .then(response => response.json())
    .then(data => {allCustomersData = data.customers
        getGuests()
        // console.log('allCustomersData ln 49: ', allCustomersData)
    })
}

function allRoomsFetch() {
    fetch(`http://localhost:3001/api/v1/rooms`)
    .then(response => response.json())
    .then(data => {allRoomsData = data.rooms})
    // console.log('rooms data ln 65: ', allRoomsData)
}

function allBookingsFetch() {
    fetch(`http://localhost:3001/api/v1/bookings`)
    .then(response => response.json())
    .then(data => {allBookingsData = data.bookings})
console.log('allBookingsdata ln 64: ', allBookingsData)
}

// 👇🏽👇🏽 Functions & Event Handlers 👇🏽👇🏽

function getGuests() {
    allCustomersData.forEach(guest => {
        guests.push(new Customer(guest))
        // console.log('guest ln 71: ', guest)
    })
};

function login(e) {
    e.preventDefault();
    return guests.find(guest => {
        if(guest.username === username.value && password.value === 'overlook2021') {
            hide(loadingPage)
            show(dashboardPage)
            // console.log('guest ln 66: ', guest)
            greetGuest(guest)
            getGuestBookingData(allBookingsData, allRoomsData)
            return guest
        } else {
            show(incorrectInputMessage)
        }
    })
};

function greetGuest(guest) {
// console.log('guest ln 78: ', guest.name)
    welcomeMessage.innerText = `Welcome Back, ${guest.name}!`
    // amountSpent.innerText = `$${guest.expenses}`
}

function getGuestBookingData(bookingsRepo) {
    guests.forEach(guest => {
        console.log('guest: ', guest)
        guest.getHotelRoomDetails(bookingsRepo)
    })
    console.log('getGuestBookingData() ln 103: ', getGuestBookingData())
}

// ⭐️ ⭐️ 📑 Functions needed
// 1. get previous bookings for each guest
// 2. get total amount spent
// 3. 

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

