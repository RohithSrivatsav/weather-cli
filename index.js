#!/usr/bin/env node

const readline=require('readline');
const {getWeatherByCity, isValidCityAndCountry} = require('./weather.js');


const q=readline.createInterface({
    input: process.stdin,
    output : process.stdout
});
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ask() {
    
    q.question("Enter city or type 'exit' to exit from the app: ", async (city)=>{
        if(city.toLowerCase()==='exit'){
            console.log("Thanks for using this tool");
            await delay(1000);
            console.log("you are quitting the app now...");
            await delay(1000);
            console.log("GOODBYE!");
            q.close();
            return;
        }
        q.question("Enter Country Code(Ex: IN for INDIA): ", async(countryCode)=>{
            countryCode.toUpperCase();
            if(!isValidCityAndCountry(city,countryCode)) {
                console.log("Wrong Country Code or city");
                await delay(1000);
                console.log("Try again after checking spelling");
                ask();
                return;
            }
            try{
                await getWeatherByCity(city, countryCode);
                ask();
            }
            catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log(`entered wrong location or location cant be found`)

                }
                else {
                    console.log("error fetching details:", error.message);
                }
            }
        })
        
    })
    
}
ask();
