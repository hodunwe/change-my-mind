import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { useAuth } from './firebase/AuthContext';
import './App.css';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: input,
        user: user.displayName,
        timestamp: serverTimestamp()
      });
      setInput('');
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;