const express = require('express');
const router = express.Router();
const Memory = require('../models/Memory');

// Admin panel view
router.get('/', async (req, res) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.render('admin', { memories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new memory
router.post('/add', async (req, res) => {
  try {
    const { key, value } = req.body;
    const memory = new Memory({ key, value });
    await memory.save();
    res.redirect('/admin');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all memories
router.get('/all', async (req, res) => {
  try {
    const memories = await Memory.find();
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete memory
router.delete('/:id', async (req, res) => {
  try {
    await Memory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Memory deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 