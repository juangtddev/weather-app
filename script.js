const apiKey = "c4a7dd72d7b28db648450067d3e1534c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Get the necessary DOM elements once to avoid repeated queries
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherElement = document.querySelector(".weather");
const errorElement = document.querySelector(".error");

async function checkWeather(city) {


    // Check if the city input is empty and display an error message
    if (!city) {
        errorElement.textContent = "Please enter a city name"; // Show an error if no city is entered
        errorElement.style.display = "block"; // Display the error
        weatherElement.style.display = "none"; // Hide the weather info
        return;
    }

    try {
        // Fetch the weather data from the API
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        // If the response is not OK (e.g., city not found), throw an error
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json(); // Parse the response JSON

        // Update the UI with the weather data
        cityElement.textContent = data.name;
        tempElement.textContent = `${Math.trunc(data.main.temp)}°C`; // Use Math.trunc to remove decimals
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed} km/h`;
        weatherIcon.src = `assets/images/${data.weather[0].main}.png`; // Set the weather icon

        // Display the weather info and hide any previous errors
        weatherElement.style.display = "block";
        errorElement.style.display = "none";
    } catch (error) {
        // Handle any errors, including city not found or network issues
        errorElement.textContent = error.message; // Display the error message
        errorElement.style.display = "block"; // Show the error
        weatherElement.style.display = "none"; // Hide the weather info
    }
}

// Add an event listener to the search button to trigger the weather check
searchBtn.addEventListener("click", () => checkWeather(searchBox.value));
