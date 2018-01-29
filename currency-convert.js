const axios = require("axios");

const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
        const rate = response.data.rates[to];
        if(rate){
            return rate;
        }else{
            throw new Error();    
        }  
    } catch (error) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }    
};

const getCountries = async (currency) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
        return response.data.map((country) => country.name);
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currency}.`);
    }
};

const convertCurrency = async (from, to, amount) => {
    var countries = await getCountries(to);
    var rate = await getExchangeRate(from, to); 
    let converted = rate * amount;
    return `${amount} ${from} is worth ${converted} ${to}. \n${to} can be used in the following countries:\n${countries.join(", ")}`;
};

//getExchangeRate("USD","BRL").then((rate) => console.log(rate));
//getCountries("USD").then((name) => console.log(name));
convertCurrency("BRL","USD",500).then(console.log).catch((e) => console.log(e.message));