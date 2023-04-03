import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form data and submit to server
    validateLogin(email, password);
  };

  const validateLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3030/users');
      const users = await response.json();
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        console.log('Login successful');
        navigate("/resources");
      } else {
        console.log('Invalid email or password');
        const newError = 'Invalid email or password';
        setError(newError);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className='login-heading'>
          <p className='logo'><b>RESOLUT</b> MOBILE</p>
        </div>
        <div className='sublogin-heading'>
          <h3>Login Here</h3>
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
        {error && <p style={{ color: "red" }}>Invalid email or password</p>}
        <div className='login-footer'>
          <p>Do Not Have Resource Account? <Link to="/">Contact Your Administrator</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
