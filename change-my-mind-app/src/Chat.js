import React, { useState } from 'react';
import Message from './Message';
import ChatInput from './ChatInput';
import './App.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, id: Date.now() }]);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <Message key={msg.id} text={msg.text} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;