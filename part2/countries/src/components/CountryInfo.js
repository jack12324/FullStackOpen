const CountryInfo = ({country}) => {
    if(country === null) {
        return null
    } else {
        return (
            <section>
                <h1>{country.name.common}</h1>
            </section>
        )
    }
}
export default CountryInfo