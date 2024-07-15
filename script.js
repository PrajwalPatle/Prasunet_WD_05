
async function fetchWeather() {
    const locationInput = document.getElementById('locationInput').value;
    const apiKey = '79a960dd4015e0a02e1625ad59ef689d'; 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=metric`;

    if (locationInput === '') {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                const response = await fetch(url);
                const data = await response.json();
                displayWeather(data);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    } else {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    }
}

function displayWeather(data) {
    document.getElementById('location').innerText = `Location: ${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;

    changeBackground(data.weather[0].main);
}

function changeBackground(weather) {
    let backgroundUrl;
    switch(weather.toLowerCase()) {
        case 'clear':
            backgroundUrl = 'url("images/clear.jpg")';
            break;
        case 'clouds':
            backgroundUrl = 'url("images/clouds.jpg")';
            break;
        case 'rain':
            backgroundUrl = 'url("images/rain.jpg")';
            break;
        case 'snow':
            backgroundUrl = 'url("images/snow.jpg")';
            break;
        case 'thunderstorm':
            backgroundUrl = 'url("images/thunderstorm.jpg")';
            break;
        default:
            backgroundUrl = 'url("images/default.jpg")';
            break;
    }
    document.body.style.backgroundImage = backgroundUrl;
    document.body.style.backgroundSize = 'cover';
}
