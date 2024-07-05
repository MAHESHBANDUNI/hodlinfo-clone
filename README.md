# HODLINFO Clone

This project is a clone of the HODLINFO website, which displays cryptocurrency prices and trading information from various Indian exchanges. It's built using Node.js, Express, PostgreSQL, and vanilla JavaScript.

## Features

- Real-time cryptocurrency price updates from WazirX API
- Display of top 10 cryptocurrency pairs
- Automatic data refresh every 60 seconds
- Price change indicators for various time frames (5 mins, 1 hour, 1 day, 7 days)
- Best price to trade display
- Light/Dark theme toggle
- Countdown timer for next data update
- Responsive design

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
git clone https://github.com/MAHESHBANDUNI/hodlinfo-clone.git
cd hodlinfo-clone

2. Install dependencies:
npm install

3. Set up PostgreSQL:
- Install PostgreSQL if you haven't already (https://www.postgresql.org/download/)
- Create a new database:
  ```
  createdb hodlinfo
  ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=hodlinfo
   PORT=3000
   
   Replace `your_postgres_username` and `your_postgres_password` with your actual PostgreSQL credentials.

6. Initialize the database:
node initdb.js

7. Start the server:
npm start

8. Open your web browser and navigate to `http://localhost:3000`

## Usage

- The website will automatically fetch and display the latest cryptocurrency data.
- Use the theme toggle button in the top right corner to switch between light and dark modes.
- The countdown timer shows when the next data refresh will occur.
- Cryptocurrency prices and trading information are displayed in the table.
