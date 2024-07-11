"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/chatgpt', { prompt });
      setResponse(res.data.choices[0].text);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Error fetching response.');
    }
  };

  return (
    <div>
      <h1>ChatGPT API with Next.js</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="5"
          cols="40"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}