import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './Chat';
import ChatRoom from './firebase/ChatRoom';
import GlobalChatRoom from './firebase/GlobalChatRoom';
import VideoCall from './VideoCall';
import { AuthProvider } from './firebase/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/chat/:userId" element={<ChatRoom />} />
          <Route path="/global-chat" element={<GlobalChatRoom />} />
          <Route path="/video-call/:userId" element={<VideoCall />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;