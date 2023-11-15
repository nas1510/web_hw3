const apiKey = "768e0288406389e6e0f9840659813b24";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-image i");
const cityList = [];
const weather = document.querySelector(".weather");
const errorText = document.querySelector(".error");

function updateWeatherInfo(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&#8451";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " км/ч";
  
  switch (data.weather[0].main) {
    case "Clear":
      weatherIcon.className = "fa-solid fa-sun";
      break;
    case "Rain":
      weatherIcon.className = "fa-solid fa-cloud-rain";
      break;
    case "Mist":
      weatherIcon.className = "fa-solid fa-cloud-mist";
      break;
    case "Drizzle":
      weatherIcon.className = "fa-solid fa-cloud-drizzle";
      break;
  }

  weather.style.display = "block";
  errorText.style.display = "none";
  cityList.push(data.name);
  updateCityList(); // Вызываем функцию для обновления списка
}

// Метод GET
async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`, {
      method: "GET",
    });
    if (response.status === 404) {
      errorText.style.display = "block";
      weather.style.display = "none";
    } else {
      const data = await response.json();
      console.log(data);
      updateWeatherInfo(data);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function clearCityHistory() {
    cityList.length = 0; 
    updateCityList(); 
  }

function updateCityList() {
    const cityListElement = document.getElementById("city-list");
    cityListElement.innerHTML = "";
  
    for (const cityName of cityList) {
      const listItem = document.createElement("li");
      listItem.textContent = cityName;
      cityListElement.appendChild(listItem);
    }
  }


function handleSearch() {
  checkWeather(searchInput.value);
  searchInput.value = "";
}

searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    handleSearch();
  }
});

clearHistoryButton.addEventListener("click", clearCityHistory);
