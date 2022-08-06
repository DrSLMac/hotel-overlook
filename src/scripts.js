import './css/styles.css';
import './images/favicon-16x16.png';
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file

// An example of how you tell webpack to use an image (also need to link to it in the index.html)


console.log('This is the JavaScript entry file - your code begins here.');


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