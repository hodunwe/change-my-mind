import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './AuthContext';
import Message from '../Message';
import '../App.css';

const GlobalChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'globalChat'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() && user) {
      await addDoc(collection(db, 'globalChat'), {
        text: input,
        user: user.displayName,
        timestamp: serverTimestamp()
      });
      setInput('');
    }
  };

  if (!user) {
    return (
      <div className="chat-room">
        <p>Please sign in to view the global chat room.</p>
        <button onClick={login}>Sign In</button>
      </div>
    );
  }

  return (
    <div className="chat-room">
      <button onClick={() => navigate(-1)}>Back</button>
      <div className="messages">
        {messages.map((msg) => (
          <Message key={msg.id} text={msg.text} user={msg.user} />
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default GlobalChatRoom;