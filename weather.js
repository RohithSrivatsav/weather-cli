const axios = require('axios');
const file=require('./city.list.json');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

function isValidCityAndCountry(city, countryCode)  {
    return file.some(entry=>
        entry.name.toLowerCase()===city.toLowerCase() &&
        entry.country.toUpperCase()===countryCode.toUpperCase()
    ); 
}


async function getWeatherByCity(city, countryCode) {
    
    const apiKey= process.env.API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`

    try{
        const response = await axios.get(url);
        const data = response.data;

        console.log(`\n----- ${data.name}'s present weather ----- `);
        console.log(`Temp: ${data.main.temp}°C`);
        console.log(`Condition: ${data.weather[0].description}`);
        console.log(`Humidity: ${data.main.humidity}%`);
        console.log(`Wind Speed: ${data.wind.speed} m/s\n`);

    }
    catch(error){
        if(error.response && error.response.status ===404){
            console.log(`entered wrong location or location cant be found`)
            
        }
        else{
            console.log("error fetching details:" , error.message);
        }
    } 
    //console.log(file.length);
 
}
module.exports = {getWeatherByCity, isValidCityAndCountry};