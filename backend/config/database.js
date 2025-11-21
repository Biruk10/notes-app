// Database configuration and connection
const { Pool } = require('pg');
require('dotenv').config();

// Create PostgreSQL connection pool
// Support both DATABASE_URL (for deployment) and individual credentials (for local)
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }
);

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err.message);
});

// Test connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Failed to connect to database:', err.message);
    console.error('Please check your database configuration');
  } else {
    console.log('✅ Database connection verified at:', res.rows[0].now);
  }
});

module.exports = pool;
