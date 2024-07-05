let isDarkTheme = true;

async function fetchTickers() {
    try {
        const response = await fetch('/api/tickers');
        const tickers = await response.json();
        updateTable(tickers);
        updatePriceInfo(tickers[0]);
    } catch (error) {
        console.error('Error fetching tickers:', error);
    }
}

function updateTable(tickers) {
    const tableBody = document.querySelector('#tickerTable tbody');
    tableBody.innerHTML = '';
    
    tickers.forEach((ticker, index) => {
        const row = tableBody.insertRow();
        const difference = ((ticker.buy - ticker.last) / ticker.last * 100).toFixed(2);
        const savings = (ticker.buy - ticker.last).toFixed(2);
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${ticker.name}</td>
            <td>₹ ${parseFloat(ticker.last).toLocaleString('en-IN')}</td>
            <td>₹ ${parseFloat(ticker.buy).toLocaleString('en-IN')} / ₹ ${parseFloat(ticker.sell).toLocaleString('en-IN')}</td>
            <td>${difference}%</td>
            <td>₹ ${Math.abs(savings).toLocaleString('en-IN')}</td>
        `;
    });
}

function updatePriceInfo(ticker) {
    document.getElementById('bestPrice').textContent = parseFloat(ticker.last).toLocaleString('en-IN');
    // You would need to calculate these values based on historical data
    // For this example, we'll use placeholder values
    document.getElementById('fiveMin').textContent = '0.76%';
    document.getElementById('oneHour').textContent = '1.67%';
    document.getElementById('oneDay').textContent = '7.64%';
    document.getElementById('sevenDays').textContent = '13.63%';
}

function updateCountdown() {
    const countdownElement = document.querySelector('.countdown');
    let seconds = 60;
    
    function tick() {
        seconds--;
        countdownElement.textContent = seconds;
        if (seconds > 0) {
            setTimeout(tick, 1000);
        } else {
            fetchTickers();
            seconds = 60;
            tick();
        }
    }
    
    tick();
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('light-theme', !isDarkTheme);
}

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

fetchTickers();
updateCountdown();