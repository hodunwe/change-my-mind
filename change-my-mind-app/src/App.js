import React from 'react';
import Chat from './Chat';
import Login from './firebase/Login';
import Logout from './firebase/Logout';
import { AuthProvider, useAuth } from './firebase/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AuthContent />
      </div>
    </AuthProvider>
  );
}

const AuthContent = () => {
  const { user } = useAuth();

  return user ? (
    <>
      <Logout />
      <Chat />
    </>
  ) : (
    <Login />
  );
};

export default App;