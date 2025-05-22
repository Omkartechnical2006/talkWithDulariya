const express = require('express');
const router = express.Router();
const axios = require('axios');
const Memory = require('../models/Memory');

// Initialize Gemini
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

// Helper function to format memories for prompt
async function getMemoriesPrompt() {
  const memories = await Memory.find();
  return memories.map(m => `• ${m.key}: ${m.value}`).join('\n');
}

// Chat route
router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const memories = await getMemoriesPrompt();
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const prompt = `You are a loving aunt (dulari) who speaks ONLY in Hindi language with a rural, feminine tone. You are a woman in your 60s who loves her family. Keep your responses very short and direct - maximum 2-3 sentences.
    Here are some memories about your life and family:
    ${memories}
    
    IMPORTANT: You MUST respond ONLY in Hindi language. DO NOT use any English words in your response. Use feminine word. Keep it brief and respond to this question:
    ${question}`;
    // console.log('Sending prompt to Gemini:', prompt);
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    );

    // console.log('Received response from Gemini:', response.data);

    if (!response.data.candidates || !response.data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    const text = response.data.candidates[0].content.parts[0].text;
    res.json({ response: text });
  } catch (error) {
    console.error('Error in /ask route:', error.response?.data || error);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: error.response?.data?.error?.message || error.message 
    });
  }
});

// Remember route
router.post('/remember', async (req, res) => {
  try {
    const { key, value } = req.body;
    const memory = new Memory({ key, value });
    await memory.save();
    res.json({ message: 'Memory added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manual mode route
router.get('/manual', (req, res) => {
  res.render('manual');
});

// Chat mode route
router.get('/chat', (req, res) => {
  res.render('chat');
});

module.exports = router;