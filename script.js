// Setup Variables
// =================================================
var authKey = "36d91e11af42612b959c3523093d6c9c";
var queryCity = $("#search").val().trim();

// Search History Parameters
var searchHistory = "";
var currentDay = moment().format("dddd, MMMM Do");

//Array of cities searched
var searchedCities = ["Austin","Atlanta","Chicago","Los Angelos", "New York","San Fransisco", "Seattle"];

// URL Base
var queryURLBase = "https://api.openweathermap.org/data/2.5/forecast?q=" + queryCity + "&units=imperial&appid=" + authKey;

// Functions
// =================================================

// Created search history for cities 
function searchHistory() {
    let searchedCities = localStorage.getItem("weatherApp")
    if (searchedCities) {
        populateSearch(JSON.parse(searchedCities))
    }
    var cityHistory = $("<card>").addClass("card").text(searchedCities[i]);
    $("#citiesHistory").append(cityHistory);
}

// query for 5 day forecast
function forecastWeather(latlon) {
    // new URL for five day forecast
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latlon + "&exclude=hourly,minutely&units=imperial&appid=" + APIKey;
    // AJAX Call
    $.ajax({
        url: queryURLForecast,
        method: "GET"

    }).then(function (response) {
        // For Loop to populate the 5 day forecast cards
        for (var i = 1; i < 6; i++) {

            var icon = response.daily[i].weather[0].icon;
            var iconPNG = "https://openweathermap.org/img/w/" + icon + ".png";

            var forecastCard = $("<div>").addClass("card forecastCard");
            $(".forecast").append(forecastCard);

            var cardTitle = $("<h5>").addClass("card-title").text(moment(response.daily[i].dt, "X").format("MMM Do"));
            $(foreCastCard).append(cardTitle);

            var cardBody = $("<div>").addClass("card-body");
            $(foreCastCard).append(cardBody);

            $(cardBody).append($("<p>").addClass("card-text").text("Temp: " + Math.floor(response.daily[i].temp.day) + "°F"));
            $(cardBody).append($("<p>").addClass("card-text").text("Humidity: " + response.daily[i].humidity + "%"));

        }

    });

};

function searchHistoryArray() {
    // reset 
    $("#citiesHistory").empty();
    for (i = 0; i < cities.length; i++) {
        const element = cities[i];
        let li = $("<li>").addClass("list-group-item").text(element)
        $(li).on("click", function () {
            searchWeather(element, true);
            fiveDay(element);
        })
        $("#citiesHistory").append(li)
    }
    var searchedCities = JSON.parse(window.localStorage.getItem("searchedCities")) || [];

    if (searchedCities.length > 0) {
      currentWeather(searchedCities[searchedCities.length - 1]);
    }
  
    for (var i = 0; i < searchedCities.length; i++) {
      newHistory(searchedCities[i]);
    }
  
};

// displayCityWeather function re-renders the HTML to display the appropriate content
function displayCityWeather(queryCity) {
    var queryURLBase = "https://api.openweathermap.org/data/2.5/forecast?q=" + queryCity + "&units=imperial&appid=" + authKey;
    $.ajax({
        url: queryURLBase,
        method: "GET"
    }).then(function (response) {
        // Populate empty div with city details
        $("#cityName").html(response.name);
        var weatherEmoji = response.weather[0].icon;
        var emojiURL = "http://openweathermap.org/img/w/" + weatherEmoji + ".png";
        $("#weatherIcon").attr("src", emojiURL);
        $("#weatherIcon").attr("alt", response.weather[0].description);
        $("#cityTemp").text("Temperature:" + response.main.temp + "°F");
        $("#cityHumid").text("Humidity:" + response.main.humidity + "%");
        $("#cityWind").text("Wind Speed:" + response.wind.speed + "MPH");
    })
}


// Main Processes
// =================================================

// Search Bar Input
$(document).ready(function () {
    displayCityWeather(searchedCities);
    displayCityWeather("Austin");

    // Search Button Event Listener
    $("#search").on("click", function (event) {
        event.preventDefault();
        // Get search City
        var queryCity = $("#search").val();
        displayCityWeather(queryCity);
        $("#searchText").val("");
        searchWeather(searchValue);
        fiveForecast(searchValue);
    });
    // renders search query to search history
    $("#citiesHistory").on("click", "li", function () {
        var city = $(this).text()
        searchWeather(city);
        fiveForecast(searchValue);
    })
    // Send the AJAX Call the newly assembled URL
    displayCityWeather();
});










