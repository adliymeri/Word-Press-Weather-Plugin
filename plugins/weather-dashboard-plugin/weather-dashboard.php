<?php
    /*
    Plugin Name: Weather Dashboard
    Description: Displays weather information on a simple dashboard.
    Version: 1.0
    Author: Adli Ymeri
    */

    // Enqueue scripts and styles
    function weather_dashboard_enqueue_scripts() {
        wp_enqueue_style('weather-dashboard-styles', plugins_url('assets/style.css', __FILE__));
        wp_enqueue_script('weather-dashboard-scripts', plugins_url('assets/script.js', __FILE__), array(), '1.0', true);
        wp_localize_script('weather-dashboard-scripts', 'weatherDashboardData', array(
            'apiUrl' => 'https://api.openweathermap.org/data/2.5/weather',
            'apiKey' => '6bd9dddb703fb42a65448c584deb260d',
            'countryApiUrl' => 'https://restcountries.com/v3.1/all'
        ));
    }
    add_action('wp_enqueue_scripts', 'weather_dashboard_enqueue_scripts');


    // Weather Dashboard shortcode
    function weather_dashboard_shortcode() {
        ob_start();
        ?>
        <div class="weather-dashboard-container">
            <h1>Weather Forecast</h1>
            <select class="country-list" id="country-select"></select>
            <div class="weather-tile temperature" id="temperature-tile">Temperature:</div>
            <div class="weather-tile wind" id="wind-tile">Wind:</div>
            <div class="weather-tile humidity" id="humidity-tile">Humidity:</div>
            <div class="weather-tile pressure" id="pressure-tile">Weather:</div>
        </div>
        <?php
        return ob_get_clean();
    }
    add_shortcode('weather_dashboard', 'weather_dashboard_shortcode');

