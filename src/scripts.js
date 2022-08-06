import './css/styles.css';
import './images/favicon-16x16.png';

import { Customer } from "./classes/Customer.js"
import { Room } from "./classes/Room.js"
import { Booking } from "./classes/Booking.js"

// 👇🏽👇🏽 Document Query Selectors 👇🏽👇🏽
// ⭐️ Log In Page ⭐️
const loadingPage = document.querySelector(".loading-page");
const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const loginButton = document.querySelector('.login-button')
const incorrectInputMessage = document.querySelector('incorrect-login-input');

// 🎧 Event Listeners 🎧
window.addEventListener("load", () => {
    getCurrentDate();
    //fetch allCustomers? rooms? bookings?
})
loginButton.addEventListener('click', login);

// 👇🏽👇🏽 Functions & Event Handlers 👇🏽👇🏽





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