const cityForm = document.querySelector('.search-bar');
const card = document.querySelector('.card');
const details = document.querySelector('.card--footer');
const time = document.querySelector('.time>img');
const icon = document.querySelector('.icon>img');
const forecast = new Forecast();

const updateUI = data => {
    // destructure properties
    const { cityDets, weather } = data;

    // update details template
    details.innerHTML = `
        <h3>${cityDets.EnglishName.toUpperCase()}</h5>
        <p class="condition">${weather.WeatherText.toUpperCase()}</p>
        <p class="temp">${weather.Temperature.Metric.Value} &deg;C</p>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    
    const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();
    
    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);

});

//If local storage already has a city, diaplay weather condittion of that city
if(localStorage.getItem('city')){
  forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}