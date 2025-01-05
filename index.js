function getWeather() {
    const apiKey = '963dbb87d5f4a10699f2e318c226910f';
    const weatherInput = document.querySelector('.weather-input').value; // Use valid selector
    if (!weatherInput) {
        alert('Please enter a city name');
        return;
    }

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${weatherInput}&appid=${apiKey}`; // Fix variable reference

    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });
}

function displayWeather(data) {
    const tempInfo = document.querySelector('.temp'); // Use valid selector
    const weatherInfoDiv = document.querySelector('.weather-info'); // Use valid selector
    const weatherIcon = document.querySelector('.weather-icon'); // Use valid selector

    weatherInfoDiv.innerHTML = '';
    tempInfo.innerHTML = '';

    if (data.cod !== 200) { // Check for successful response code
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temp = Math.round(data.main.temp - 273.15); // Correct temp property
        const description = data.weather[0].description; // Fix typo and property access
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const tempHTML = `<p>${temp}°C</p>`;
        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;
        
        tempInfo.innerHTML = tempHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage(); // Call corrected function
    }
}

function showImage() {
    const weatherIcon = document.querySelector('.weather-icon'); // Use valid selector
    weatherIcon.style.display = 'block';
    weatherIcon.style.textAlign = 'center';
}
