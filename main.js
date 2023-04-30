const weatherApikey = {
  ApiKey: "7f758b0bbafb2b727de8e6a05ac3034d",
};

const searchInput = document.querySelector(".serch-city");
const backgroundImg = document.getElementsByTagName("BODY")[0];
async function fetchWeather(cityName) {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApikey.ApiKey}&units=metric`
  );
  const data = await weather.json();
  console.log(data);

  weatherDetails(data);

  backgroundImg.style.background = `url(https://source.unsplash.com/daily?${cityName})`;
  backgroundImg.style.backgroundPosition = "center center";
  backgroundImg.style.backgroundSize = "cover";
  backgroundImg.style.backgroundRepeat = "no-repeat";
}

function getCityName(event) {
  event.preventDefault();
  const searchInputValue = searchInput.value;
  fetchWeather(searchInputValue);
  searchInput.value = "";

  console.log(event);
}

console.log(getCityName);

navigator.geolocation.getCurrentPosition(function (position) {
  console.log(position.coords);

  const c = position.coords;
  const { coords } = position;
  const { latitude, longitude } = coords;
  console.log(latitude, longitude);

  const getCurrentCityData = async function (lt, lg) {
    const getResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lt}&lon=${lg}&appid=7f758b0bbafb2b727de8e6a05ac3034d&units=metric`
    );

    const data = await getResponse.json();
    console.log(data);

    weatherDetails(data);
    backgroundImg.style.background = `url(https://source.unsplash.com/daily?${data.name})`;
    backgroundImg.style.backgroundPosition = "center";
    backgroundImg.style.backgroundSize = "cover";
    backgroundImg.style.backgroundRepeat = "no-repeat";
  };

  getCurrentCityData(latitude, longitude);
});

function weatherDetails(data) {
  const city = document.querySelector(".city-name");

  if (data.name) {
    city.innerText = data.name;
  } else {
    alert("Pls Enter a Valid City Name");
  }

  const celsius = document.querySelector(".celsius");
  celsius.innerHTML = `${Math.floor(data.main.temp)}<sup>o</sup>C`;

  const weatherIcon = document.querySelector(".weather-icon");
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const weatherDesc = document.querySelector(".cloud-describ");
  weatherDesc.innerText = data.weather[0].description;

  const humidity = document.querySelector(".humidity");
  humidity.innerText = ` ${data.main.humidity}%`;

  const windSpeed = document.querySelector(".windSpeed");
  windSpeed.innerText = ` ${data.wind.speed}km/h`;
}

const faSearch = document.querySelector(".fa-search");
faSearch.addEventListener("click", getCityName);
