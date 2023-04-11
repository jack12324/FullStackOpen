import {useEffect, useState} from "react";
import axios from "axios";
import './components/CountryList'
import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";

function App() {
    const [countryFilter, setCountryFilter] = useState('')
    const [countries, setCountries] =  useState([])

    const initialGet = () => {
        axios.get('https://restcountries.com/v3.1/all').then(
            response => {
                setCountries(response.data)
            }
        )
    }

    const handleNewCountryFilter = (event) => {
       setCountryFilter(event.target.value)
    }

    useEffect(initialGet, [])

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
    const countryToDisplay = filteredCountries.length === 1 ? filteredCountries[0] : null

    return (
        <div className="App">
            <section>
                <label>find countries <input onChange={handleNewCountryFilter} value={countryFilter}/></label>
            </section>
            <CountryList countries={filteredCountries}/>
            <CountryInfo country={countryToDisplay}/>
        </div>
    );
}

export default App;
