const cityForm = document.querySelector('.search-bar');
const card = document.querySelector('.card');
const details = document.querySelector('.card--footer');
const time = document.querySelector('.time>img');
const icon = document.querySelector('.icon>img');

const updateUI = data => {

    const { cityDets, weather } = data;

    details.innerHTML = `
        <h3>${cityDets.EnglishName.toUpperCase()}</h5>
        <p class="condition">${weather.WeatherText.toUpperCase()}</p>
        <p class="temp">${weather.Temperature.Metric.Value} &deg;C</p>
    `;
    
    // Updating weather icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    //Updating night/day
    const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    //Card not visible initially
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async city => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather};
};

cityForm.addEventListener('submit', e => {

    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    
    //Update UI with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //Set Local Storage
    localStorage.setItem('city', city);

});

//If local storage already has a city, diaplay weather condittion of that city
if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}