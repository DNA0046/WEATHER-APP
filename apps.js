
const apikey = "46f80a02ecae410460d59960ded6e1c6";

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value.trim();
  if (cityValue) {
    await fetchWeatherData(cityValue);
  } else {
    displayError("Please enter a city name.");
  }
});

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric"
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    updateWeatherData(data);
  } catch (error) {
    displayError(error.message);
  }
}

function updateWeatherData(data) {
  const { main, weather, wind } = data;
  const temperature = Math.round(main.temp);
  const description = weather[0].description;
  const icon = weather[0].icon;
  const details = [
    `Feels like: ${Math.round(main.feels_like)}°C`,
    `Humidity: ${main.humidity}%`,
    `Wind speed: ${wind.speed} m/s`,
  ];

  weatherDataEl.querySelector(
    ".icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
  weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
  weatherDataEl.querySelector(".description").textContent = description;
  weatherDataEl.querySelector(".details").innerHTML = details
    .map((detail) => `<div>${detail}</div>`)
    .join("");
}

function displayError(message) {
  weatherDataEl.querySelector(".icon").innerHTML = "";
  weatherDataEl.querySelector(".temperature").textContent = "";
  weatherDataEl.querySelector(".description").textContent = message;
  weatherDataEl.querySelector(".details").innerHTML = "";
}
