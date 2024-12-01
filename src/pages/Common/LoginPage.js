import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('role', data.role);
      localStorage.setItem('user_id', data.user_id);
      navigate(`/${data.role.toLowerCase()}/dashboard`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="box">
      <div className="form">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="inputBox">
          <input
            type="text"
            required="required"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span>Username</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input
            type="password"
            required="required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
          <i></i>
        </div>
        <div className="links">
          <a href="#">Forgot password?</a>
          <a href="#">Sign Up</a>
        </div>
        <input type="submit" value="Login" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
