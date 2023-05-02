// Get the form and result list elements
const weatherForm = document.getElementById('weather-form');
const resultList = document.getElementById('result-list');
const apiKey = '840a3ddffcd9ac4065f9837e8e4cf233';

// Weather icons
const iconMap = {
  '01d': '01d.png', //clear-day
  '01n': '01n.png', //clear-night
  '02d': '02d.png', //partly-cloudy-day
  '02n': '02n.png', //partly-cloudy-night
  '03d': '03d.png', //cloudy
  '03n': '03n.png', //cloudy
  '04d': '04d.png', //cloudy
  '04n': '01d.png', //cloudy
  '09d': '09d.png', //rain
  '09n': '01d.png', //rain
  '10d': '10d.png', //rain
  '10n': '10n.png', //rain
  '11d': '11d.png', //thunderstorm
  '11n': '11n.png', //thunderstorm
  '13d': '13d.png', //snow
  '13n': '13n.png', //snow
  '50d': '50d.png', //fog
  '50n': '50n.png', //fog
}

// Add a listener for the form submit event
weatherForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent form submission

  // Get the form input value
  const cityInput = document.getElementById('city');
  const city = cityInput.value.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  
  console.log(city);

  // Make an API call to get the weather data for the entered city
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Please enter valid city (e.g. Fullerton or fullerton).');
      }
      return response.json();
    })
    .then(data => {
      // Get the weather data from the API response
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      const timezone = data.timezone;
      const weatherConditionCode = data.weather[0].icon;
      const iconUrl = `../Images/${data.weather[0].icon}.png`;
      
      // Use the timezone to get the current time
      const currentTime = timezone ? new Date(Date.now() + (timezone * 1000)) : new Date();
    
      // Get the current date
      const currentDate = currentTime.toLocaleDateString('en-US', {timeZone: 'UTC'});
      
      // Create a new entry and add it to the result list
      const newItem = document.createElement('div');
      newItem.classList.add('result-item');
      newItem.innerHTML = `
       <div class="card">
         <h2 class="card-title">${city}</h2>
         <img src="${iconUrl}">
         <div class="card-body">
            <p>Current Temperature: ${temp}&deg;F</p>
            <p>Feels Like: ${feelsLike}&deg;F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind: ${wind} mph</p>
            <p>Last Time Updated: ${currentDate}, ${currentTime.toLocaleTimeString('en-US', {timeZone: 'UTC'})}</p>
         </div>
         <button class="remove-button">Remove</button>
       </div>
     `;
     resultList.appendChild(newItem);

// Add a listener for the remove button functionality
newItem.addEventListener('click', function(event) {
  if (event.target.classList.contains('remove-button')) {
    event.target.parentElement.remove();
  }
});

    // Clear the form input
    cityInput.value = '';

    // Remove the default result if entry is added to the list
    if (resultList.children.length === 2) {
        const defaultItem = resultList.children[0];
        if (defaultItem.id === 'default-item') {
            defaultItem.remove();
        }
      }
    })
    .catch(error => {
      console.error(error);
      alert(error.message);
    });
});
