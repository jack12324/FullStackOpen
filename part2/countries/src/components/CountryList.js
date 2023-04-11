const CountryList = ({countries}) => {
    if(countries.length > 10) {
        return (
            <section>
                <p>Too many matches, specify another filter</p>
            </section>
        )
    } else if(countries.length === 1){
        return (
            <section>
            </section>
        )
    } else if (countries.length === 0){
        return (
            <section>
                <p>No matches</p>
            </section>
        )
    } else {
        return (
            <section>
                {countries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
            </section>
        )

    }
}

export default CountryList