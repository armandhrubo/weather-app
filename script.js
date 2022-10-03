const api_key = '9739297f98043820bb8e8ab44bdf8c0e';

// This works 4f0c5f237b428cfe861db9dc06e5875a

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (location) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`;

async function getWeatherByLocation(location) {
    const response = await fetch(url(location));

    const responseData = await response.json();


    addWeatherToApp(responseData)
    console.log(responseData)
}


function addWeatherToApp(data) {
    const temp = kelvinToCelcius(data.main.temp);
    const real_feel = kelvinToCelcius(data.main.feels_like);
    const windspeed = windspeedConversion(data.wind.speed);
    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <p>Current weather in ${search.value}</p>
        <h2><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C</h2>
        <p class = "description">${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind speed: ${windspeed} km/h</p>
        <p>Real feel: ${real_feel}°C</p>
        `;


    main.innerHTML= "";
    main.appendChild(weather);

}

// getWeatherByLocation("Helsinki");

function kelvinToCelcius(K) {
    return Math.floor(K - 273.15);
}

function windspeedConversion(M) {
    return Math.floor(M * 18/5);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    if (location) {
        getWeatherByLocation(location);
    }
})
