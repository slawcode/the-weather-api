// Event listener added to 'Search' button
document.getElementById('searchButton').addEventListener('click', function() {
    // Variables created 
    var city = document.getElementById('cityInput').value;
    var apiKey = '90144234923256377c0e16ccc86b8d67'; // API key 
    var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=90144234923256377c0e16ccc86b8d67`; // API URL

    // Fetch initiates request to the URL and parses it as JSON
    fetch(apiUrl).then(response => response.json())
    // Handle parsed data and if successful update the <p> tag with the weather results  
    .then(data => {
        if (data.cod === 200) {
            var weatherResults = `
            <h2>${data.name}<h2>
            <p>Temperature: ${data.main.temp} °F</p>
            <p>Weather: ${data.weather[0].description}</p>
            `;
            document.getElementById('fiveDays').innerHTML = weatherResults;
        } else {
            // Handle errors with custom message and render to page in <p> tag
            document.getElementById('fiveDays').innerHTML = '<p>This city could not be found</p>';
        }
    })

    .catch(error => {
        console.error('There was an error fetching this weather data', error);
        document.getElementById('fiveDays').innerHTML = '<p>There was an error fetching this weather data</p>';
    });
});