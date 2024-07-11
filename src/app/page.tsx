"use client";

// pages/api/chatgpt.js

import axios from 'axios';

export default async function handler(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (req.method === 'POST') {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: req.body.prompt,
          max_tokens: 100,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching response:', error.response?.data || error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}