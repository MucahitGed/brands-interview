import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
import "../styles/SignupForm.css";

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { username, password, role });
      console.log('Basariyla Kayit Olundu');
      setIsRegistered(true);
    } catch (error) {
      console.error('Kayit Hatasi: ', error);
      setError('Kayit Olurken Bir Hata Olustu');
    }
  }

  if (isRegistered) {
    navigate('/login', { replace: true });
  }

  return (
    <div className='body'>
      <div className="container">
        <h2 className="header">Signup</h2>
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
          <select 
            value={role} 
            onChange={e => setRole(e.target.value)} 
            className="select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="button">Signup</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>Zaten Bir Hesabin Varmi? <Link to="/login" className="link">Sign in</Link></p>
      </div>
    </div>
  );
}

export default SignupForm;
