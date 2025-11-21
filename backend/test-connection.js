// Quick test script to verify database connection
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function testConnection() {
  console.log('Testing database connection...');
  console.log('Configuration:');
  console.log(`  Host: ${process.env.DB_HOST}`);
  console.log(`  Port: ${process.env.DB_PORT}`);
  console.log(`  User: ${process.env.DB_USER}`);
  console.log(`  Database: ${process.env.DB_NAME}`);
  console.log('');

  try {
    // Test connection
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful!');
    console.log('   Server time:', result.rows[0].now);
    console.log('');

    // Check if tables exist
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📋 Tables in database:');
    if (tablesResult.rows.length === 0) {
      console.log('   ⚠️  No tables found! Run: npm run setup-db');
    } else {
      tablesResult.rows.forEach(row => {
        console.log(`   ✓ ${row.table_name}`);
      });
    }

    await pool.end();
    console.log('\n✅ All checks passed! You can start the server now.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('');
    console.error('Common fixes:');
    console.error('1. Check if PostgreSQL is running');
    console.error('2. Verify username and password in .env file');
    console.error('3. Make sure database "notes_app" exists');
    console.error('4. Check if port 5432 is correct');
    process.exit(1);
  }
}

testConnection();
