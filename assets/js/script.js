const API_KEY = "d_rD_GbRglpxPWGCW1IJ8lMFkE0";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

async function postForm(e) {
    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    })
}

// Wrap promise in an async function and then await the promise coming true
async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    // Now we await a response
    const response = await fetch(queryString);

    // When the response comes back we need to convert to json, the json() method also returns a promise
    //so we need to await that too
    const data = await response.json();

    // If everything has gone well, a property is set on the response object and this property is the “ok” property.
    // If the server returns the HTTP status code of 200 then our request has been successful and the “ok” property will be set to True.
    // If it returns an error code, then the “ok” property will be set to false. Add an if statement to check if our response.ok property is set to True.
    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    resultsModal.show();
}

