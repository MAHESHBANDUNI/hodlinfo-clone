require('dotenv').config();
const { Pool } = require('pg');

// PostgreSQL connection pool

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Create the tickers table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS tickers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    last NUMERIC NOT NULL,
    buy NUMERIC NOT NULL,
    sell NUMERIC NOT NULL,
    volume NUMERIC NOT NULL,
    base_unit VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

// Function to initialize the database
async function initializeDatabase() {
  try {
    await pool.query(createTableQuery);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Function to insert ticker data
async function insertTicker(ticker) {
  const query = `
    INSERT INTO tickers (name, last, buy, sell, volume, base_unit)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  const values = [ticker.name, ticker.last, ticker.buy, ticker.sell, ticker.volume, ticker.base_unit];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error('Error inserting ticker:', error);
  }
}

// Function to get all tickers
async function getAllTickers() {
  const query = 'SELECT * FROM tickers ORDER BY name LIMIT 10';
  
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching tickers:', error);
    return [];
  }
}

async function clearTickers() {
    const query = 'DELETE FROM tickers';
    try {
      await pool.query(query);
    } catch (error) {
      console.error('Error clearing tickers:', error);
    }
  }
  
  module.exports = {
    initializeDatabase,
    insertTicker,
    getAllTickers,
    clearTickers,
  };