// Database setup script - Run this with Node.js to create tables
const { Client } = require('pg');
require('dotenv').config();
async function setupDatabase() {
  // First connect to postgres database to create notes_app database
  const adminClient = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres' // Connect to default postgres database
  });
  try {
    await adminClient.connect();
    console.log('Connected to PostgreSQL server');
    // Check if database exists
    const dbCheck = await adminClient.query(
      "SELECT 1 FROM pg_database WHERE datname = 'notes_app'"
    );
    if (dbCheck.rows.length === 0) {
      await adminClient.query('CREATE DATABASE notes_app');
      console.log('✅ Database "notes_app" created successfully');
    } else {
      console.log('ℹ️  Database "notes_app" already exists');
    }
    await adminClient.end();
    // Now connect to notes_app database to create tables
    const appClient = new Client({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'notes_app'
    });
    await appClient.connect();
    console.log('Connected to notes_app database');
    // Create users table
    await appClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');
    // Create notes table
    await appClient.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Notes table created');
    // Create indexes
    await appClient.query(`
      CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id)
    `);
    await appClient.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `);
    console.log('✅ Indexes created');
    await appClient.end();
    console.log('\n🎉 Database setup completed successfully!');
    console.log('You can now start the server with: npm start');
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}
setupDatabase();
