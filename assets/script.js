document.getElementById('searchButton').addEventListener('click', function() {
    var city = document.getElementById('cityInput').value;
    var apiKey = '90144234923256377c0e16ccc86b8d67';
    var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=90144234923256377c0e16ccc86b8d67`;
    // var apiUrl = `http://api.openweathermap.org/data2.5/weather?q=${city}&appid=${apiKey}&untis=metric`;

    fetch(apiUrl).then(response => response.json())
    
    .then(data => {
        if (data.code === 200) {
            var weatherResults = `
            <h2>${data.name}<h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            `;
            document.getElementById('fiveDays').innerHTML = weatherResults;
        } else {
            document.getElementById('fiveDays').innerHTML = '<p>This city could not be found</p>';
        }
    })
    .catch(error => {
        console.error('There was an error fetching this weather data', error);
        document.getElementById('fiveDays').innerHTML = '<p>There was an error fetching this weather data</p>';
    });
});