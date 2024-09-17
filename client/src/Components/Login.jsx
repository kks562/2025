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
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", { email, password });
      if (response.data) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.accessToken);
  
        // Optionally, store user info as well, if needed
        localStorage.setItem('user', JSON.stringify(response.data.user));
  
        // Navigate to the home page after login
        navigate('/home'); 
      }
    } catch (error) {
      alert('Invalid email or password');
    }
  };
  
const register1=()=>{
  navigate('/register');
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
            <button type="submit" className='bt'>Login</button>
            <div className="register">
              <p>Don't have an account? <a href="#" onClick={register1}>Register</a></p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
