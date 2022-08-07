import './css/styles.css';
import './images/favicon-16x16.png';

import { Customer } from "./classes/Customer.js"
import { Room } from "./classes/Room.js"
import { Booking } from "./classes/Booking.js"

// 👇🏽👇🏽 Document Query Selectors 👇🏽👇🏽

// ⭐️ Log In Page ⭐️
const loadingPage = document.querySelector(".loading-page");
const username = document.querySelector('.username-input');
const password = document.querySelector('.password-input');
const loginButton = document.querySelector('.login-button')
const incorrectInputMessage = document.querySelector('incorrect-login-input');
// 🎛 Customer Dashboard 🎛


// 🌏 Global Variables 🌏
let allCustomersData;
let guests = [];
let currentCustomer;
let allRoomsData;
let allBookingsData;
let roomNumber;
let chosedDate;

// 🎧 Event Listeners 🎧
// window.addEventListener("load", () => {
    // getCurrentDate();
    //fetch allCustomers? rooms? bookings?
// })
loginButton.addEventListener('click', login);

// 🐕 Fetch Functions 🐕
function allCustomersFetch() {
    fetch(`http://localhost:3001/api/v1/customers`)
    .then(response => response.json())
    .then(data => {
        allCustomersData = data.customers
        console.log('allCustomersData: ', allCustomersData)
        getGuests()
    })
}

// 👇🏽👇🏽 Functions & Event Handlers 👇🏽👇🏽

function getGuests() {
    allCustomersData.forEach(guest => {
        console.log('customer: ', guest)
    getGuests.push(new Customer(guest))
})
};

function login(e) {
    e.preventDefault();
    console.log('guests: ', guests)
    return guests.find(guest => {
        if(guest.username === username.value && password.value === 'overlook2021') {
            hide(loadingPage)
            console.log('guest: ', guest)
            return guest
}

    })
};



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

// function fetchWords() {
//     return fetch('http://localhost:3001/api/v1/words')
//     .then(response => response.json())
//       .then((data) => {
//         data.forEach(word => words.push(word))
//         setGame()
//       })
//       .catch(error => console.log(error))
//     }

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