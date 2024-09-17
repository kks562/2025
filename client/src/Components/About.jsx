import React from 'react';
import './About.css';
import back from '../assets/l.jpg';
import back1 from '../assets/d1.jpeg';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate=useNavigate();
    const home=()=>{
        navigate('/home');
    }
  return (
    <>
      <div className="image">
        <img src={back} alt="Background Image" />
      </div>
    <div className="about-container">
    <img 
    className='back-icon' 
    src={back1} 
    alt='Back' 
    onClick={home} 
/>
      <div className="about-banner">
        <h1>About Us</h1>
      </div>
      <div className="about-content">

        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Welcome to Scentist, where we believe that a fragrance is more than just a scent; it's a journey through memory, emotion, and identity. Founded in [Year], our brand has been dedicated to crafting unique and luxurious fragrances that capture the essence of beauty and individuality.
          </p>
        </div>
        <div className="about-section">
          <h2>Our Philosophy</h2>
          <p>
            At Scentist, we are passionate about using only the finest ingredients sourced from around the world. Each of our perfumes is meticulously crafted by our expert perfumers to ensure a harmonious blend of notes that tell a unique story.
          </p>
        </div>
        <div className="about-section">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="path/to/team-member1.jpg" alt="Kavin Krishna S" />
              <h3>Kavin Krishna S</h3>
              <p>Web Developer</p>
            </div>
            <div className="team-member">
              <img src="path/to/team-member2.jpg" alt="Mithilesh K" />
              <h3>Mithilesh K</h3>
              <p>Frontend Developer</p>
            </div>
            <div className="team-member">
              <img src="path/to/team-member3.jpg" alt="Nithish Kumar R" />
              <h3>Nithish Kumar R</h3>
              <p>Backend Developer</p>
            </div>
          </div>
        </div>
        <div className="about-section">
          <h2>Our Promise</h2>
          <p>
            We promise to deliver exceptional quality and unforgettable experiences with each of our products. Our commitment to sustainability and ethical practices ensures that you can indulge in luxury with a clear conscience.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
