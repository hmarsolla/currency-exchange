const axios = require("axios");

const getExchangeRate = (from, to) => {
    return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response) => {
        return response.data.rates[to];
    });
};

const getCountries = (currency) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`).then((response) => {
        return response.data.map((country) => country.name);
    });
};

const convertCurrency = async (from, to, amount) => {
    var countries = await getCountries(to);
    var rate = await getExchangeRate(from, to); 
    let converted = rate * amount;
    return `${amount} ${from} is worth ${converted} ${to}. \n${to} can be used in the following countries:\n${countries.join(", ")}`;
};

//getExchangeRate("USD","BRL").then((rate) => console.log(rate));
//getCountries("USD").then((name) => console.log(name));
convertCurrency("BRL","USD",500).then(console.log);