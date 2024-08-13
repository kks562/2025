import React from 'react';
import './Contact.css';
import { useNavigate } from 'react-router-dom';
import backgroundVideo from '../assets/pern2.mp4';
import back from '../assets/d1.jpeg';

const Contact = () => {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "6d7e43d6-68e7-4fe7-88a8-d003f1d1e083");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            console.log("Success", res);
        }
    };

    const navigate = useNavigate();

    const home = () => {
        navigate('/home');
    };

    return (
        <div className="contact-container">
            <video autoPlay muted loop className="video-background">
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <img 
    className='back-icon' 
    src={back} 
    alt='Back' 
    onClick={home} 
/>

            
            <form onSubmit={onSubmit} className="contact-form">
                <h2>Contact Form</h2>
                <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" className="input-field" placeholder='Enter Name' name='name' required />
                </div>
                <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" className="input-field" placeholder='Enter Email' name='email' required />
                </div>
                <div className="input-group">
                    <label>Your Message</label>
                    <textarea name="message" className="input-field message-field" placeholder='Enter Message' required></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;
