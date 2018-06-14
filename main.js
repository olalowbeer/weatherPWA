const searchCity = document.getElementById('searchCity');
const appID = '3f811f4e602b5451b64f25e97ad55d60';
const weatherParam = 'weather';

searchCity.addEventListener('change', () => {
    const searchValue = searchCity.value;
    getTodaysWeather(searchValue);
    document.getElementById('searchCity').value = '';
})

getTodaysWeather();

function getTodaysWeather(city = "Stockholm") {
    fetch(`http://api.openweathermap.org/data/2.5/${weatherParam}?q=${city}&APPID=${appID}&units=metric`)
        .then((response) => response.json())
        .then((weatherData) => {
            displayWeather(weatherData);
        })
        .catch((error) => {
            console.log(error);
        })
}

function displayWeather(weatherData) {
    const city = weatherData.name;
    const temp = weatherData.main.temp;
    const weatherInfoElement = document.getElementById('weatherInfo');
    const weatherTomorrowElement = document.getElementById('weatherTomorrow');

    const sunriseTime = new Date(weatherData.sys.sunrise * 1000);
    const sunrise = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const sunsetTime = new Date(weatherData.sys.sunset * 1000);
    const sunset = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let weatherInfo = `
      <h2> ${city} </h2>
      <img src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="Weather icon" />
        <ul>
          <li> ${weatherData.weather[0].main} / ${weatherData.weather[0].description} </li>
          <li> <strong>Temperature:</strong> ${Math.round(temp)}°C </li>
          <li> <strong>Wind:</strong> ${weatherData.wind.speed} m/s </li>
          <li> <strong>Sunrise:</strong> ${sunrise} </li>
          <li> <strong>Sunset:</strong> ${sunset} </li>
        </ul>
    `;
    weatherInfoElement.innerHTML = weatherInfo;
}