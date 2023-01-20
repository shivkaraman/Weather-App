class Forecast {
    constructor(){
        this.key = 'mYYvSGnX29129lF5GQ49UUiNnScIErWc';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
        const cityDets = await getCity(city);
        const weather = await getWeather(cityDets.Key);
        return {cityDets, weather};
    }

    //Get weathere information
    async getWeather(cityCode){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);//Gives a list of cities with closest match for given input, 0th obj is  closest match
        const data = await response.json();
        return data[0];

    }

    //Get city information
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);//Gives a list of cities with closest match for given input, 0th obj is  closest match
        const data = await response.json();
        return data[0];
    }
  }