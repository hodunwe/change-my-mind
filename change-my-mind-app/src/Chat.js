import React, { useState } from 'react';
import UserList from './firebase/UserList';
import ChatRoom from './firebase/ChatRoom';
import './App.css';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat-container">
      <UserList onSelectUser={setSelectedUser} />
      {selectedUser && <ChatRoom selectedUser={selectedUser} />}
    </div>
  );
};

export default Chat;