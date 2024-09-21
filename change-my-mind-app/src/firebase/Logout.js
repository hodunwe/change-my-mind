import React from 'react';
import { useAuth } from './AuthContext';
import './Button.css';

const Logout = () => {
  const { logout } = useAuth();

  return (
    <button className="button" onClick={logout}>Logout</button>
  );
};

export default Logout;