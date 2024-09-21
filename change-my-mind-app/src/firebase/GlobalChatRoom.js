import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './UserList.css';

const UserList = () => {
  const { findUsers, user: currentUser, login, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await findUsers();
      setUsers(users);
      setLoading(false);
    };
    fetchUsers();
  }, [findUsers]);

  const handleSelectUser = (user) => {
    navigate(`/chat/${user.uid}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-list">
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li
            key={user.uid}
            onClick={() => handleSelectUser(user)}
            className={currentUser && user.uid === currentUser.uid ? 'current-user' : ''}
          >
            {user.displayName} {currentUser && user.uid === currentUser.uid && '(You)'}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/global-chat')}>Global Chat</button>
      {currentUser ? (
        <button onClick={logout}>Sign Out</button>
      ) : (
        <button onClick={login}>Sign In</button>
      )}
    </div>
  );
};

export default UserList;