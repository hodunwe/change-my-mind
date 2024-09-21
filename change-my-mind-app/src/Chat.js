import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase/firebase';
import Message from './Message';
import ChatInput from './ChatInput';
import './App.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <Message key={msg.id} text={msg.text} user={msg.user} />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default Chat;