const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apiKey = "4e9294f02613bc6d47178ee8459dccb7";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a valid city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  cityDisplay.classList.add("city-display");

  tempDisplay.textContent = `${Math.round(temp)} °F`;
  tempDisplay.classList.add("temp-display");

  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  humidityDisplay.classList.add("humidity-display");

  descDisplay.textContent = description;
  descDisplay.classList.add("description-display");

  weatherEmoji.textContent = getWeatherEmoji(id);
  weatherEmoji.classList.add("weather-emoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧";
    case weatherId >= 500 && weatherId < 600:
      return "🌧";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "❓";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("error-display");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

// Time-of-day Themes
document.addEventListener("DOMContentLoaded", dynamicTheme);

function dynamicTheme() {
  let hours = new Date().getHours();

  if (hours >= 5 && hours < 11) {
    themeClass = "morning-theme";
  } else if (hours >= 11 && hours < 17) {
    themeClass = "afternoon-theme";
  } else if (hours >= 17 && hours < 22) {
    themeClass = "evening-theme";
  } else {
    themeClass = "night-theme";
  }
  document.body.classList.remove("morning-theme", "afternoon-theme", "evening-theme", "night-theme");

  document.body.classList.add(themeClass);
}
