import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1"
const getCountry = async (countryName) => {
  const response = await axios.get(`${baseUrl}/name/${countryName}?fields=name,flags,capital,population`)
  return response.data[0]
}

const countryService = {getCountry}

export default countryService