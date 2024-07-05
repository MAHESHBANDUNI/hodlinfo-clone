require('dotenv').config();
const express = require('express');
const axios = require('axios');
const db = require('./database');
const app = express();
const port = process.env.PORT || 3000;

async function fetchAndStoreData() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = Object.values(response.data).slice(0, 10);
    
    await db.clearTickers(); // Clear existing tickers
    for (const ticker of tickers) {
      await db.insertTicker(ticker);
    }
  } catch (error) {
    console.error('Error fetching and storing data:', error);
  }
}

app.get('/api/tickers', async (req, res) => {
  try {
    const tickers = await db.getAllTickers();
    res.json(tickers);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use(express.static('public'));

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    await db.initializeDatabase();
    fetchAndStoreData();
    setInterval(fetchAndStoreData, 60000); // Fetch and store data every minute
  });
  