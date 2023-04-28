const weatherApikey = {
  ApiKey: "7f758b0bbafb2b727de8e6a05ac3034d",
};

async function fetchWeather(cityName) {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApikey.ApiKey}&units=metric`
  );
  const data = await weather.json();
  console.log(data);

  const city = document.querySelector(".city-name");
  city.innerText = data.name;
  const celsius = document.querySelector(".celsius");
  celsius.innerHTML = `${Math.floor(data.main.temp)}<sup>o</sup>C`;

  const humidity = document.querySelector(".humidity");
  humidity.innerText = ` ${data.main.humidity}%`;

  const windSpeed = document.querySelector(".windSpeed");
  windSpeed.innerText = ` ${data.wind.speed}km/h`;

  console.log(windSpeed);
}

function getCityName() {
  fetchWeather(`${document.querySelector(".serch-city").value}`);
}

console.log(getCityName);
const faSearch = document.querySelector(".fa-search");

faSearch.addEventListener("click", getCityName);
