import React from 'react';
import './App.css';

const Message = ({ text, user }) => {
  return (
    <div className="message">
      <strong>{user}</strong>: {text}
    </div>
  );
};

export default Message;