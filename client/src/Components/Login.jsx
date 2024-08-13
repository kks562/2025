import React, { useState } from 'react';
import './Login.css';
import video from '../assets/pern2.mp4';
import image from '../assets/b.png';
import { IonIcon } from '@ionic/react';
import { mailSharp, lockClosedSharp } from 'ionicons/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/register", { email, password });
      alert('Registration successful');
    } catch (error) {
      console.log('Registration failed:', error);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", { email, password });
      if (response.data) {
        navigate('/home'); 
      }
    } catch (error) {
        alert('Invalid email or password');
      }
      
  }

  return (
    <div>
      <section>
        <video autoPlay muted loop id="background-video">
          <source src={video} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <img src={image} alt="Logo" className="logo" />
        <div className="login-box">
          <form onSubmit={login}>
            <h2>Login</h2>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={mailSharp} />
              </span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={lockClosedSharp} />
              </span>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Password</label>
            </div>
            <div className="remember">
              <label>
                <input type="checkbox" />Remember Me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className='bt' onClick={login}>Login</button>
            <div className="register">
              <p>Don't have an account? <a href="#" onClick={register}>Register</a></p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
