import React from 'react';
import { useAuth } from './AuthContext';

const Login = () => {
  const { login } = useAuth();

  return (
    <button onClick={login}>Login with Google</button>
  );
};

export default Login;