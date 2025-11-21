// Notes routes CRUD 
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');
// Apply authentication middleware to all routes
router.use(authMiddleware);
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC',
      [req.userId]
    );
    res.json({
      success: true,
      notes: result.rows
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching notes.' 
    });
  }
});
//create a new note
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    // Validate input
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title is required.' 
      });
    }
    // insert new note
    const result = await pool.query(
      'INSERT INTO notes (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [req.userId, title, description || '']
    );
    res.status(201).json({
      success: true,
      message: 'Note created successfully.',
      note: result.rows[0]
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating note.' 
    });
  }
});
//update notes
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    // Validate input
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title is required.' 
      });
    }
    const noteCheck = await pool.query(
      'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
      [id, req.userId]
    );
    if (noteCheck.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Note not found or unauthorized.' 
      });
    }
    const result = await pool.query(
      'UPDATE notes SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, description || '', id, req.userId]
    );
    res.json({
      success: true,
      message: 'Note updated successfully.',
      note: result.rows[0]
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating note.' 
    });
  }
});
//delet
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if note exists and belongs to user
    const noteCheck = await pool.query(
      'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
      [id, req.userId]
    );
    if (noteCheck.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Note not found or unauthorized.' 
      });
    }
    // Delete note
    await pool.query(
      'DELETE FROM notes WHERE id = $1 AND user_id = $2',
      [id, req.userId]
    );
    res.json({
      success: true,
      message: 'Note deleted successfully.'
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting note.' 
    });
  }
});
module.exports = router;
