"use client"

import React, { useState } from 'react';
import { getChatCompletion } from './openaiService';

function App() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const basemessage = "Nous jouons à donjon et dragon et tu es le maitre du jeu. Propose nous une quete, fais nous avancer dans l'histoire, laisse nous nous combattre avec des enemies des bosses, créé des pnj avec qui on pourrais intéragir, etc... Il faut que le jeu contienne une fin. Il faut que tu sois Role Play, tu es un sage qui nous raconte une histoire, et a chaque fin de réponse, tu dois nous proposer une action avec plusieurs choix";

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = async () => {
    const initialMessage = { role: 'system', content: basemessage };

    try {
      const aiMessage = await getChatCompletion([initialMessage]);

      // Ajouter la réponse de l'IA à l'interface
      const newMessages = [initialMessage, { role: 'assistant', content: aiMessage.content }];
      setMessages(newMessages);

      // Mettre à jour isPlaying après avoir ajouté le message
      setIsPlaying(true);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    // Ajouter le message de l'utilisateur à l'interface
    const userMessage = { role: 'user', content: userInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setUserInput('');

    try {
      const aiMessage = await getChatCompletion(updatedMessages);

      // Ajouter la réponse de l'IA à l'interface
      const aiMessages = [...updatedMessages, { role: 'assistant', content: aiMessage.content }];
      setMessages(aiMessages);

    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <div className="App">
      {!isPlaying ? (
        <button onClick={handleClick}>Jouer</button>
      ) : (
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
      )}
    </div>
  );
}

export default App;
