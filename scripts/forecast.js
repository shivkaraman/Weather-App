const key = 'mYYvSGnX29129lF5GQ49UUiNnScIErWc';

//Get weathere information
const getWeather = async cityCode => {

    const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityCode}?apikey=${key}`;

    const response = await fetch(baseUrl + query);//Gives a list of cities with closest match for given input, 0th obj is  closest match
    const data = await response.json();
    return data[0];
};

//Get city information
const getCity = async city => {
    
    const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';  
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(baseUrl + query);//Gives a list of cities with closest match for given input, 0th obj is  closest match
    const data = await response.json();
    return data[0];
}

