const Weather = ({country, weather}) => {
    if (!country|| !weather) {
        return null
    } else return(
        <section>
            <h2>Weather in ${country.capital}</h2>
            <p>temperature ${weather.main.temp} F</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                 alt={weather.weather[0].description}/>
            <p>wind ${weather.wind.speed} mph</p>
        </section>
    )
}

export default Weather