const btn = document.getElementById('btn');
const price = document.getElementById('price');

window.onload = checkPrice('USD');

btn.addEventListener('click', function(){
    let currType = document.querySelector('input[name="currency"]:checked').value
    checkPrice(currType);
});

function checkPrice(currency) {
    console.log(currency);
    let result;
    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function() {
        if(XHR.readyState === 4 && XHR.status === 200) {
            let data = JSON.parse(XHR.responseText);
            result = data.bpi[currency].rate_float
            console.log(result)
            result = Math.round(result * 100)/100  
            price.innerText = result; 
            currencyValue.innerText = ' ' + currency;       
        } else if (XHR.status === 404){
            console.log('Error ' + XHR.responseText);
        }     
    }

    XHR.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');
    XHR.send();

}

