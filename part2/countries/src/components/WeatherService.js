import { useEffect, useState } from "react";
import axios from 'axios';

const WeatherService = ({ country }) => {
    const [weather, setWeather] = useState("")
    const key = process.env.REACT_APP_API_KEY;
    
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${key}&query=${country}`)
            .then(response => setWeather(response.data))
            .catch(error => console.log(error))
    }, [country, key])

    if (weather.success === false) return <p>{weather.error.info}</p>

    if (weather) {
        return (
            <div>
                <h3>Weather in {country}</h3>
                <p>Temperature: {weather.current.temperature} Celsius</p>
                <img src={weather.current.weather_icons[0]} alt="current weather" />
                <p>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
            </div>
        )
    } else {
        return <p>Loading...</p>
    }
}

export default WeatherService;