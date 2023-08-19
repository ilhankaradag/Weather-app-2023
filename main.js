let cityName = '';
// let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=756decaaf7dba11d153506aed70c6335`;
let inputField = document.querySelector('#curr');
let button = document.querySelector('#btn-src');
let rstCity = document.querySelector('.city');
let rstTemp = document.querySelector('.temp');
let locationIcon = document.querySelector('.weather-icon');
let main = document.querySelector('.main');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let error = document.querySelector('.error');
let weather = document.querySelector('.weather');
let dateData = document.querySelector('.date');

inputField.addEventListener('input', (e) => {
  cityName = e.target.value;
  console.log(cityName);
});

button.addEventListener('click', fetchingData);

function fetchingData() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=756decaaf7dba11d153506aed70c6335&units=metric`,
  )
    .then((response) => response.json())
    .then((data) => {
      rstCity.innerHTML = data.name + ' , ' + data.sys.country;
      rstTemp.innerHTML = Math.round(data.main.temp) + ' ' + '°C';
      const iconData = data.weather[0].icon;
      locationIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconData}.png">`;
      main.innerHTML = data.weather[0].main;
      humidity.innerHTML = data.main.humidity + ' ' + '%';
      wind.innerHTML = data.wind.speed + ' ' + 'm/s';
      weather.style.display = 'block';
      error.style.display = 'none';

      var d = data.dt * 1000;
      var date = new Date(+d);

      dateData.innerHTML =
        date.toDateString() + ' ' + date.toLocaleTimeString();
      console.log(date.toLocaleTimeString());
    })
    .then(() => {
      inputField.value = ' ';
    })
    .catch((err) => {
      error.style.display = 'block';
      weather.style.display = 'none';
    });
}
