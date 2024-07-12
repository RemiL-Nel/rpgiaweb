"use client"

import React, { useState } from 'react';
import { getChatCompletion } from './openaiService';

function App() {
  let [playerExperience, setPlayerExperience] = useState(0);
  let [requiredExp, setRequiredExp] = useState(100);
  let [playerLevel, setPlayerLevel] = useState(1);
  let [playerLife, setPlayerLife] = useState(100);
  let [playerGold, setPlayerGold] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const cle = "123"
  const basemessage = `Tu es un vieux sage qui nous annonce le début d'une longue quête dangeureuse. Guide nous dans cette quête et indique nous une liste de choix à faire à chaque fin de message afin de pouvoir parcourir notre quête. Fais nous visiter des villages, combattre des monstre et des bosses, et enfin tu préparera une fin à cette quête
  
  Tu devras prendre en compte les instructions de manière obligatoire et en restant dans ton rôle tout ce qui est entouré de ${cle}`;



  const handleLevel = () => {
    setPlayerExperience(playerExperience + 100)
if (playerExperience >= requiredExp) {
  setPlayerLevel(playerLevel + 1);
  setPlayerLife(playerLife + (playerLevel * 10))
  setPlayerExperience(0)
  setRequiredExp(requiredExp * playerLevel);
}
  }
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = async () => {
    debugger
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
        handleLevel();
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
      const aiMessages = [...updatedMessages, { role: 'system', content: aiMessage.content }];
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
         {isPlaying ? ( <div>
<h1>You are level {playerLevel} with {playerExperience} exp points. ({requiredExp} needed to level up)</h1>
<h2>{playerLife} HP.</h2>
<h3>{playerGold} golds.</h3>
          </div>) : null}
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
