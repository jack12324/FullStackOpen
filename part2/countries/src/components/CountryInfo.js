const CountryInfo = ({country}) => {
    if(country === null) {
        return null
    } else {
        return (
            <section>
                <h1>{country.name.common}</h1>
                <section>
                    <p>capital: {country.capital}</p>
                    <p>area: {country.area}</p>
                </section>
                <section>
                    <h2>Languages:</h2>
                    <ul>
                        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                    </ul>
                </section>
                <section>
                    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width={200} height={200}/>
                </section>
            </section>
        )
    }
}
export default CountryInfo