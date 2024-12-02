document.getElementById("CurrencyEnter").addEventListener("input", convertCurrency);
document.getElementById("CurrencySelector").addEventListener("change", convertCurrency);

function convertCurrency() {
  const value = parseFloat(document.getElementById("CurrencyEnter").value);
  const currency = document.getElementById("CurrencySelector").value;

  if (isNaN(value)) {
    // Clear output fields if the input is not a number
    document.getElementById("kztin").value = '';
    document.getElementById("eurin").value = '';
    document.getElementById("usdin").value = '';
    return;
  }

  // Replace 'YOUR_API_KEY' with your actual API key
  let apiURL = `https://api.currencyapi.com/v3/latest?apikey=cur_live_DeXd3srcbOhXVUAy6w8HauCeWpjH4xRoYiFNptnR&currencies=EUR%2CUSD%2CKZT&base_currency=${currency}`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const rates = data.data;

      // Calculate converted amounts
      const kztRate = rates['KZT'].value;
      const usdRate = rates['USD'].value;
      const eurRate = rates['EUR'].value;

      // Update output fields
      document.getElementById("kztin").value = (value * kztRate).toFixed(2);
      document.getElementById("usdin").value = (value * usdRate).toFixed(2);
      document.getElementById("eurin").value = (value * eurRate).toFixed(2);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}
