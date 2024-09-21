import React from 'react';
import { useAuth } from './AuthContext';

const Logout = () => {
  const { logout } = useAuth();

  return (
    <button onClick={logout}>Logout</button>
  );
};

export default Logout;