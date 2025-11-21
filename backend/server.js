// Main server-Express application setup
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// Import routes
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Notes App API is running!' 
  });
});
// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found.' 
  });
});
// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error.' 
  });
});
// Auto-create tables on startup (for deployment)
const pool = require('./config/database');

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    
    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('⚠️  Database initialization error:', error.message);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  await initializeDatabase();
});
