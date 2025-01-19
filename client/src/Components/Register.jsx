import React, { useState } from 'react';
import './Register.css';
import video from '../assets/pern2.mp4';
import logo from '../assets/b.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://two025-ln5f.onrender.com/register", { name, email, password });
      setIsRegistered(true);
      setTimeout(() => navigate('/home'), 2000);

    } catch (error) {
      console.log('Registration failed:', error);
    }
  };

  return (
    <div>
      <section>
        <video autoPlay muted loop id="background-video">
          <source src={video} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <img src={logo} alt="Logo" className="logo" />
        <div className="register-box">
          <form onSubmit={register}>
            <h2>Register</h2>
            <div className="input-box">
              <span className="icon">
              {/* <FontAwesomeIcon icon={faUser} /> */}
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Name</label>
            </div>
            <div className="input-box">
              <span className="icon">
              {/* <FontAwesomeIcon icon={faEnvelope} /> */}
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
              {/* <FontAwesomeIcon icon={faLock} /> */}
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>
            <button type="submit" className="bt">Register</button>
          </form>
          {isRegistered && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, y: '1900%' }}
              animate={{ opacity: 1, y: '1500%' }}
              transition={{ duration: 0.5 }}
            >
              Registration successful! 
              {/* <FontAwesomeIcon icon={faCheckCircle} className="success-icon" /> */}
              </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Register;
