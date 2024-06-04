import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/LoginForm.css";
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/loginbyusername', { username, password });
      console.log('Login response:', response);
      const { accessToken, user_role } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userRole', user_role);
      console.log('Login Basarili');
      window.location = '/';
    } catch (error) {
      console.error('Login error: ', error);
      setError('Gecersiz kullanici adi yada sifre');
    }
  }

  return (
    <div className='body'>
      <div className="container">
        <h2 className="header">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            className="input"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="input"
          />
          <button type="submit" className="button">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>Hesabiniz Yokmu? <Link to="/signup" className="link">Sign up</Link></p>
      </div>
    </div>
  );
}

export default LoginForm;
