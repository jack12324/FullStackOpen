const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY

const getCurrent = (lat, lon) => {
    console.log(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
}

const service = {getCurrent}

export default service