import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ countryName }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({})
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryName}`)
            .then(res => setWeather(res.data.current))
    }, [api_key, countryName])
    if (weather)
        return (
            <div>
                <h3>Weather in {countryName}</h3>
                <p><b>temperature:</b> {weather.temperature} Celcius</p>
                {weather.weather_icons ? <img src={weather.weather_icons[0]} alt={'weather icon'} /> : null}
                <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir} </p>
            </div>
        )
    else
        return (
            <div>
                <p>Weather not avariable</p>
            </div>
        )
}

export default Weather