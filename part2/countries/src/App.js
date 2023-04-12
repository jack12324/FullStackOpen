import {useEffect, useState} from "react";
import axios from "axios";
import './components/CountryList'
import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";
import WeatherService from "./services/weather"
import Weather from "./components/Weather";

function App() {
    const [countryFilter, setCountryFilter] = useState('')
    const [countries, setCountries] =  useState([])
    const [selectedCountry, setSelectedCountry] =  useState(null)
    const [weather, setWeather] =  useState(null)


    const initialGet = () => {
        axios.get('https://restcountries.com/v3.1/all').then(
            response => {
                setCountries(response.data)
            }
        )
    }

    const handleNewCountryFilter = (event) => {
        setCountryFilter(event.target.value)
        setSelectedCountry(null)
    }

    const filterCountries = () => {
        if(selectedCountry === null){
            return countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
        } else {
            return [selectedCountry]
        }
    }

    const handleCountrySelect = (country) => {
        console.log(country)
        setSelectedCountry(country)
    }

    const weatherHook = () => {
        if(!countryToDisplay){
            setWeather(null)
        } else {
            WeatherService.getCurrent(countryToDisplay.latlng[0], countryToDisplay.latlng[1])
        }
    }

    const filteredCountries = filterCountries()
    const countryToDisplay = filteredCountries.length === 1 ? filteredCountries[0] : null

    useEffect(initialGet, [])
    useEffect(weatherHook, [countryToDisplay])

    return (
        <div className="App">
            <section>
                <label>find countries <input onChange={handleNewCountryFilter} value={countryFilter}/></label>
            </section>
            <CountryList countries={filteredCountries} selectHandler={handleCountrySelect}/>
            <CountryInfo country={countryToDisplay}/>
            <Weather country={countryToDisplay} weather={weather}/>
        </div>
    );
}

export default App;
