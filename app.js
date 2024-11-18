// script.js  
const apiKey = '1e5539b8e77b12b9ed0676ea'; 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;  

async function fetchExchangeRates() {  
    const response = await fetch(apiUrl);  
    const data = await response.json();  
    return data.conversion_rates;  
}  

function populateCurrencyOptions(rates) {  
    const fromCurrency = document.getElementById('fromCurrency');  
    const toCurrency = document.getElementById('toCurrency');  

    for (const currency in rates) {  
        const optionFrom = document.createElement('option');  
        optionFrom.value = currency;  
        optionFrom.textContent = currency;  
        fromCurrency.appendChild(optionFrom);  

        const optionTo = document.createElement('option');  
        optionTo.value = currency;  
        optionTo.textContent = currency;  
        toCurrency.appendChild(optionTo);  
    }  
    fromCurrency.value = 'USD';


    toCurrency.value = 'INR'; 
}  

async function convertCurrency() {  
    const amount = document.getElementById('amount').value;  
    const fromCurrency = document.getElementById('fromCurrency').value;  
    const toCurrency = document.getElementById('toCurrency').value;  
    const rates = await fetchExchangeRates();  

    if (fromCurrency === toCurrency) {  
        document.getElementById('result').textContent = "Please select different currencies.";  
        return;  
    }  

    const convertedAmount = (amount * rates[toCurrency] / rates[fromCurrency]).toFixed(2);  
    document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;  
}  

document.getElementById('convertBtn').addEventListener('click', convertCurrency);  

fetchExchangeRates().then(populateCurrencyOptions);  
