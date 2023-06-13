document.addEventListener('DOMContentLoaded', function() {
    // Retrieve countries list from API
    function getCountriesList() {
        fetch(weatherDashboardData.countryApiUrl)
            .then(response => response.json())
            .then(data => {
                populateCountriesList(data);
                var firstCountry = data[0].name.common;
                getWeatherData(firstCountry);
            })
            .catch(error => console.log('Error:', error));
    }

    // Populate countries list in dropdown
    function populateCountriesList(countries) {
        var selectElement = document.getElementById('country-select');

        countries.sort(function(a, b) {
            // Sort countries alphabetically by name
            var countryA = a.name.common.toUpperCase();
            var countryB = b.name.common.toUpperCase();
            if (countryA < countryB) {
                return -1;
            }
            if (countryA > countryB) {
                return 1;
            }
            return 0;
        });

        countries.forEach(function(country) {
            var option = document.createElement('option');
            option.value = country.name.common;
            option.text = country.name.common;
            selectElement.appendChild(option);
        });

        // Add event listener to update weather data on country selection
        selectElement.addEventListener('change', function() {
            var selectedCountry = selectElement.value;
            getWeatherData(selectedCountry);
        });
    }

    // Fetch weather data from the API based on selected country
    function getWeatherData(country) {
        var apiUrl = weatherDashboardData.apiUrl;
        var apiKey = weatherDashboardData.apiKey;

        fetch(apiUrl + '?q=' + country + '&appid=' + apiKey)
            .then(response => response.json())
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => console.log('Error:', error));
    }

    // Display weather data on the dashboard
    function displayWeatherData(data) {
        var temperatureTile = document.getElementById('temperature-tile');
        temperatureTile.textContent = 'Temperature: ' + (data.main.temp_min - 273.15).toFixed(2) + '°C / ' + (data.main.temp_max - 273.15).toFixed(2) + '°C';

        var windTile = document.getElementById('wind-tile');
        windTile.textContent = 'Wind: ' + data.wind.speed + ' m/s, ' + data.wind.deg + '°';

        var humidityTile = document.getElementById('humidity-tile');
        humidityTile.textContent = 'Humidity: ' + data.main.humidity + '%';

        var pressureTile = document.getElementById('pressure-tile');
        pressureTile.textContent = 'Pressure: ' + data.main.pressure + ' hPa';
    }

    // Initialize the dashboard
    function initDashboard() {
        getCountriesList();
    }

    initDashboard();
});
