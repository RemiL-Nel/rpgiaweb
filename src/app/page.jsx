"use client"

import React, { useState } from 'react';
import { getChatCompletion } from './openaiService';

function App() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    // Ajouter le message de l'utilisateur à l'interface
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const aiMessage = await getChatCompletion(userInput);

      // Ajouter la réponse de l'IA à l'interface
      const aiMessages = [...newMessages, { role: 'ai', content: aiMessage.content }];
      setMessages(aiMessages);

    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}-message`}>
              <span className="message-content">{message.content}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Posez votre question..."
            className="user-input"
          />
          <button type="submit" className="send-btn">Envoyer</button>
        </form>
      </div>
    </div>
  );
}

export default App;
