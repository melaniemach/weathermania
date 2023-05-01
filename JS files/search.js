// Get the form and result list elements
const weatherForm = document.getElementById('weather-form');
const resultList = document.getElementById('result-list');
const apiKey = '840a3ddffcd9ac4065f9837e8e4cf233';

// Add a listener for the form submit event
weatherForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent form submission

  // Get the form input value
  const cityInput = document.getElementById('city');
  const city = cityInput.value;
  
  console.log(city);

  // Make an API call to get the weather data for the entered city
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Unable to get weather data for the entered city. Please try again.');
      }
      return response.json();
    })
    .then(data => {
      // Get the weather data from the API response
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;

      // Create a new entry and add it to the result list
      const newItem = document.createElement('div');
      newItem.classList.add('result-item');
      newItem.innerHTML = `
       <div class="card">
         <h2 class="card-title">${city}</h2>
         <div class="card-body">
            <p>Current Temperature: ${temp}&deg;F</p>
            <p>Feels Like: ${feelsLike}&deg;F</p>
            <p>Humidity: ${humidity}%</p>
             <p>Wind: ${wind} mph</p>
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
