// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors'; 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));

app.use(cors());
app.use(express.json());

// AI Rewrite endpoint
app.post('/api/rewrite', async (req, res) => {
  try {
    const { text, model } = req.body;

    if (!text) return res.status(400).json({ error: 'No text provided' });

    // Build prompt for AI rewrite
    const prompt = `Rewrite the following description for an Amazon social media post. 
Keep it concise, catchy, human-like, and ready to post. 
Add fitting emojis where appropriate based on the description.
Do NOT change the structure of the post outside the description section.

${text}`;

    // OpenRouter API call
    const response = await fetch('https://api.openrouter.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: model || "gpt-4.1-mini:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150
      })
    });

    const data = await response.json();

    // Properly extract AI output for OpenRouter
    const output = data?.choices?.[0]?.message?.content || '';

    res.json({ output });

  } catch (err) {
    console.error('AI rewrite failed:', err);
    res.status(500).json({ error: 'AI rewrite failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
