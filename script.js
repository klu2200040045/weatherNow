document.getElementById('weather-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const city = document.getElementById('city').value;

    // Replace with your actual OpenWeather API key
    const apiKey = '4eb3703790b356562054106543b748b2'; // Add your OpenWeather API key here
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            console.log('Full API response:', data);

            // Extract temperature, humidity, and other data
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const pressure = data.main.pressure;
            const description = data.weather[0].description;
            const cityName = data.name;
            const country = data.sys.country;

            // Update the HTML content of the weather-info div
            const weatherInfo = `
                <h3>Weather Data for ${cityName}, ${country}</h3>
                <p><strong>Temperature:</strong> ${temperature} °C</p>
                <p><strong>Humidity:</strong> ${humidity} %</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                <p><strong>Pressure:</strong> ${pressure} hPa</p>
                <p><strong>Weather Description:</strong> ${description}</p>
            `;

            // Display the weather information
            const weatherInfoContainer = document.getElementById('weather-info');
            weatherInfoContainer.innerHTML = weatherInfo;
         // Make the info box visible
        })
        .catch(error => {
            // Handle any errors (e.g., city not found)
            alert('Error: ' + error.message);
            console.error('Error:', error);
        });
});
