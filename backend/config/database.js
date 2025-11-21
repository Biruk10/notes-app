// Database configuration and connection
const { Pool } = require('pg');
require('dotenv').config();
// Create PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});
pool.on('error', (err) => {
  console.error('❌ Database connection error:', err.message);
  console.error('Check your .env file settings:');
  console.error(`DB_HOST: ${process.env.DB_HOST}`);
  console.error(`DB_PORT: ${process.env.DB_PORT}`);
  console.error(`DB_USER: ${process.env.DB_USER}`);
  console.error(`DB_NAME: ${process.env.DB_NAME}`);
});
// Test connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Failed to connect to database:', err.message);
    console.error('Please check your database configuration in .env file');
  } else {
    console.log('✅ Database connection verified at:', res.rows[0].now);
  }
});
module.exports = pool;
