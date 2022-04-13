var searchCityBtn = document.querySelector('#searchButton');
var form = document.querySelector('.city-form');
var searchCity = document.querySelector('#inputCity');
var currentWeatherDis = document.querySelector('.current-weather');
var APIKey = 'c4cf63baf903a5c6bb761374d95fa8f1';
var currentCityName = document.querySelector('#city-name');
var currentTemp = document.querySelector('#temperature');
var currentWind = document.querySelector("#wind-speed");
var currentHum = document.querySelector('#humidity');
var currentUV = document.querySelector('#UV-index');
var WeatherIcon = document.querySelector('#weatherIcon1')
var fiveDay = document.querySelector('.forecast')
var forecast = document.querySelector('#fivedayForecast')
var city = '';





function getCurrentWeatherApi() {
    city = searchCity.value
    var RequestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


    fetch(RequestUrl)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {

        WeatherIcon.textContent = (data.weather.icon);
        currentCityName.textContent = (data.name)
        currentTemp.textContent = 'Temp: ' + (data.main.temp);
        currentWind.textContent = 'Wind: ' + (data.wind.speed);
        currentHum.textContent = 'Humidity: ' + (data.main.humidity)
        currentUV.textContent = 'UV: ' + (data.uvi);      
      })
}

//render the search history

function savePreviousSearch (){
city = searchCity.value
var getSearches = {}
var setSearches = localStorage.setItem('searched', JSON.stringify(getSearches[city]))
window.localStorage.getItem('searched')
if(setSearches) {
  JSON.parse(getSearches)
}



  const savedSearches = document.querySelector('#savedSearches')
  const li = document.createElement('li')
  li.textContent = city
  savedSearches.append(li)
}


function get5DayForecastApi(){
  city = searchCity.value
  var cityInfoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' +APIKey

  if(document.querySelector('#cardsContainer')) {
    var cardsContainer = document.querySelector('#cardsContainer')
    cardsContainer.remove();
  }

  fetch(cityInfoUrl)
  .then(function(response){
    return response.json()
  })
  .then(function(data){
   console.log(data)
   var coord = {
     lat: data[0].lat,
     lon: data[0].lon
   }
   var FiveDayUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + coord.lat + '&lon=' + coord.lon + '&exclude=minutely,hourly,alerts&appid=' + APIKey;
    

    fetch(FiveDayUrl)
    .then(function(response){
    return response.json();
    })

   .then(function(data){
     var cardsContainer = document.createElement('div')
     cardsContainer.setAttribute('id', 'cardsContainer')
         for(var i = 0; i < 5; i++) {
           console.log(data)
            var card = document.createElement('div');
            card.classList = 'col forecast bg-primary text-white ml-3 md-3 rounded'
            var day = data.daily[i].dt
            var icon = data.daily[i].weather[0].icon
            var iconUrl = 'http://openweathermap.org/img/w/' + icon + '.png';
            console.log(data.daily[i].weather[0].icon)
            var temp = data.daily[i].temp.max
            var wind = data.daily[i].wind_speed
            var UVI = data.daily[i].uvi
            var date = document.createElement('h4')
            var temperature = document.createElement('p')
            var windSpeed = document.createElement('p')
            var UVIndex = document.createElement('p')
            var weatherIcon = document.createElement('img')
            weatherIcon.setAttribute ('src', iconUrl);
            weatherIcon.innerText = icon
            temperature.innerText = temp
            windSpeed.innerText = wind
            UVIndex.innerText = UVI
            date.innerText = day
            card.appendChild(date)
            card.appendChild(weatherIcon)
            card.appendChild(temperature)
            card.appendChild(windSpeed)
            card.appendChild(UVIndex)
            cardsContainer.append(card)
         }
         forecast.append(cardsContainer)
      })
  })

}


function handleFormSubmit (event) {
   event.preventDefault();
   event.stopPropagation();
   getCurrentWeatherApi();
   get5DayForecastApi();
   savePreviousSearch();
    

}

searchCityBtn.addEventListener('click', handleFormSubmit)
