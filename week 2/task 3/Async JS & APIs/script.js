const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const status = document.querySelector("#status");
const statusMessage = document.querySelector("#status-message");
const errorMessage = document.querySelector("#error-message");
const weatherContent = document.querySelector("#weather-content");
const welcomeState = document.querySelector("#welcome-state");

const weatherCodes = {
  0: ["Clear sky", "☀"], 1: ["Mainly clear", "🌤"], 2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁"], 45: ["Foggy", "🌫"], 48: ["Rime fog", "🌫"],
  51: ["Light drizzle", "🌦"], 53: ["Drizzle", "🌦"], 55: ["Heavy drizzle", "🌧"],
  61: ["Light rain", "🌦"], 63: ["Rain", "🌧"], 65: ["Heavy rain", "🌧"],
  71: ["Light snow", "🌨"], 73: ["Snow", "❄"], 75: ["Heavy snow", "❄"],
  80: ["Rain showers", "🌦"], 81: ["Rain showers", "🌧"], 82: ["Heavy showers", "🌧"],
  95: ["Thunderstorm", "⛈"], 96: ["Thunderstorm", "⛈"], 99: ["Thunderstorm", "⛈"]
};

function getWeatherDescription(code) {
  return weatherCodes[code] || ["Unknown conditions", "·"];
}

function setLoading(isLoading, message = "Finding your weather...") {
  status.hidden = !isLoading;
  statusMessage.textContent = message;
  form.querySelector("button").disabled = isLoading;
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  weatherContent.hidden = true;
  welcomeState.hidden = true;
}

function formatTime(value) {
  return new Date(value).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatDate(value, options) {
  return new Date(`${value}T12:00:00`).toLocaleDateString([], options);
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("The weather service is unavailable right now.");
  return response.json();
}

async function searchWeather(city) {
  setLoading(true, `Looking up ${city}...`);
  errorMessage.hidden = true;
  try {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const locationData = await fetchJson(geocodeUrl);
    if (!locationData.results?.length) throw new Error(`We couldn't find "${city}". Try a nearby city.`);
    const location = locationData.results[0];
    setLoading(true, `Loading weather for ${location.name}...`);
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto&forecast_days=5`;
    const weather = await fetchJson(weatherUrl);
    renderWeather(location, weather);
  } catch (error) {
    showError(error.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
}

function renderWeather(location, weather) {
  const current = weather.current;
  const [condition, icon] = getWeatherDescription(current.weather_code);
  document.querySelector("#location-name").textContent = location.name;
  document.querySelector("#location-detail").textContent = [location.admin1, location.country].filter(Boolean).join(" · ");
  document.querySelector("#current-icon").textContent = icon;
  document.querySelector("#current-temperature").textContent = Math.round(current.temperature_2m);
  document.querySelector("#current-condition").textContent = condition;
  document.querySelector("#feels-like").textContent = `${Math.round(current.apparent_temperature)}°`;
  document.querySelector("#humidity").textContent = `${current.relative_humidity_2m}%`;
  document.querySelector("#wind-speed").textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  document.querySelector("#sunrise").textContent = formatTime(weather.daily.sunrise[0]);
  document.querySelector("#forecast-range").textContent = `${formatDate(weather.daily.time[0], { month: "short", day: "numeric" })} — ${formatDate(weather.daily.time[4], { month: "short", day: "numeric" })}`;

  const forecastGrid = document.querySelector("#forecast-grid");
  forecastGrid.replaceChildren();
  weather.daily.time.forEach((date, index) => {
    const [dayCondition, dayIcon] = getWeatherDescription(weather.daily.weather_code[index]);
    const card = document.createElement("article");
    card.className = `forecast-card${index === 0 ? " today" : ""}`;
    card.innerHTML = `<p>${index === 0 ? "Today" : formatDate(date, { weekday: "short" })}</p><span class="forecast-icon" aria-label="${dayCondition}">${dayIcon}</span><strong>${Math.round(weather.daily.temperature_2m_max[index])}°</strong><small>${Math.round(weather.daily.temperature_2m_min[index])}°</small>`;
    forecastGrid.append(card);
  });
  document.querySelector("#last-updated").textContent = `Updated ${formatTime(current.time)}`;
  weatherContent.hidden = false;
  welcomeState.hidden = true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) searchWeather(city);
});

const initialWeather = {
  current: {
    time: new Date().toISOString(),
    temperature_2m: 22,
    relative_humidity_2m: 58,
    apparent_temperature: 23,
    weather_code: 1,
    wind_speed_10m: 11
  },
  daily: {
    time: ["2026-11-10", "2026-11-11", "2026-11-12", "2026-11-13", "2026-11-14"],
    weather_code: [1, 2, 0, 3, 61],
    temperature_2m_max: [25, 24, 26, 23, 21],
    temperature_2m_min: [17, 16, 18, 15, 14],
    sunrise: ["2026-11-10T06:42:00"]
  }
};

renderWeather({
  name: "Lisbon",
  admin1: "Lisbon",
  country: "Portugal"
}, initialWeather);
