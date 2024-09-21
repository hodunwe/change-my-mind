import React from 'react';
import { useAuth } from './AuthContext';
import './Button.css';

const Login = () => {
  const { login } = useAuth();

  return (
    <button className="button" onClick={login}>Login with Google</button>
  );
};

export default Login;