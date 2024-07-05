let cityName = document.querySelector('.weather_city');
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temp = document.querySelector(".weather_temperature");
let w_minTemp = document.querySelector(".weather_min");
let w_maxTemp = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector('.weather_feelsLike');
let w_humidity = document.querySelector('.weather_humidity');
let w_wind = document.querySelector('.weather_wind');
let w_pressure = document.querySelector('.weather_pressure');

let citySearch = document.querySelector('.weather_search')

let city = "Ahmedabad";
const apiKey = OPENWEATHERMAP_API_KEY ;

citySearch.addEventListener('submit', (e) => {
    e.preventDefault();
    let cityName = document.querySelector('.city_name');
    console.log(cityName.value);
    city = cityName.value;
    getWeatherData();
    cityName.value = '';
});

const getWeatherData = async () => {

    const weatherUrl = `httpss://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    console.log(weatherUrl);

    try{
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const {main, name, weather, wind, sys, dt} = data;
        
        const getCountryName = (code) => {
            return new Intl.DisplayNames([code], { type: 'region' }).of(code);
        }

        cityName.innerHTML = `${name},${getCountryName(sys.country)}`;

        const getDateTime = (dt) => {
            const currDate = new Date(data.dt * 1000);
            console.log(currDate);

            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                // second: "numeric",
            };

            const formatter = new Intl.DateTimeFormat("en-US",options);

            return formatter.format(currDate);
        }

        dateTime.innerHTML = `${getDateTime(dt)}`;

        w_forecast.innerText = weather[0].main;
        w_icon.innerHTML = `<img src =  "http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`;
        w_temp.innerHTML = `${main.temp} K`;
        w_minTemp.innerHTML = `Min:${main.temp_min.toFixed()} K`;
        w_maxTemp.innerHTML = `Max:${Math.ceil(main.temp_max)} K`;

        w_feelsLike.innerHTML = `${main.feels_like} K`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure}hPa`;

        
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

document.body.addEventListener('load', getWeatherData());