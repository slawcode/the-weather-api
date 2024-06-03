// Event listener added to 'Search' button
document.getElementById('searchButton').addEventListener('click', function() {
    // Variables created 
    var city = document.getElementById('cityInput').value;
    var apiKey = 'e76c56ebb37d9fd7d5794053a4dea252'; // API key 
    const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`; // API URL

    // Fetch initiates request to the URL and parses it as JSON
    fetch(apiUrlWeather).then(response => response.json())
    // Handle parsed data and if successful update the <p> tag with the weather results  
    .then(data => {
        if (data.cod === 200) {
            const {lat,lon}=data.coord
            var weatherResults = `
            <h2>${data.name}<h2>
            <p>Temperature: ${data.main.temp} °F</p>
            <p>Weather: ${data.weather[0].description}</p>
            `;
            document.getElementById('current').innerHTML = weatherResults;
            const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
            fetch(apiUrlForecast).then(response => response.json()).then(data => {
                console.log(data)
                displayForecast(data)
            })
        } else {
            // Handle errors with custom message and render to page in <p> tag
            document.getElementById('cityInput').innerHTML = '<p>This city could not be found</p>';
        }
    })

    .catch(error => {
        console.error('There was an error fetching this weather data', error);
        document.getElementById('fiveDays').innerHTML = '<p>There was an error fetching this weather data</p>';
    });
});

function displayForecast(data) {
    console.log('clicked');
    let weatherResults = ''
    for (let i = 3; i < data.list.length; i += 8) {
        weatherResults += `
        <h2>${data.list[i].dt_txt}<h2>
        <p>Temperature: ${data.list[i].main.temp} °F</p>
        <p>Weather: ${data.list[i].weather[0].description}</p>
        `;  
    }
    document.getElementById('fiveDays').innerHTML = weatherResults;
}