import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { IonIcon } from '@ionic/react';
import { cartOutline, personCircleOutline, menuOutline } from 'ionicons/icons';
import image from '../src/assets/b.png'
import arrowImage from '../src/assets/arrow_btn.png'
import './Home.css';
import Background from './Components/Background';
import Text from './Components/Text';

const Home = () => {
    const data = [
        { text1: "Scent Your Story", text2: "With Elegance" },
        { text1: "Unveil Your Essence", text2: "One Spritz at a Time." },
        { text1: "Where Fragrance", text2: "Meets Your Identity" },
    ];

    const [count, setCount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); 

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        navigate('/products', { state: { selectedCategory: category } });
    };

    const handleViewProducts = () => {
        navigate('/products', { state: { selectedCategory } });
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const gotoAbout=()=>{
        navigate(`/about`);
    };

    const gotoContact=()=>{
        navigate(`/contact`);
    };

    const gotologin=()=>{
        navigate(`/`);
    };

    const gotocart=()=>{
        navigate(`/cart`);
    };

    return (
        <>
            <div className="navbar">
                <img src={image} alt="Logo" />
                <ul className={menuOpen ? 'open' : ''}>
                    <li onClick={() => handleCategoryClick('Men')}>Mens</li>
                    <li onClick={() => handleCategoryClick('Women')}>Womens</li>
                    <li onClick={() => handleCategoryClick('Unisex')}>Unisex</li>
                    <li onClick={gotoAbout}>About</li>
                    <li onClick={gotoContact}>Contact</li>
                </ul>
                <div className="icon">
                    <IonIcon icon={cartOutline} onClick={gotocart}/>
                    <IonIcon icon={personCircleOutline} onClick={gotologin}/>
                    <IonIcon icon={menuOutline} onClick={toggleMenu} className="menu-icon"/>
                </div>
            </div>
            <div className="img">
                <Background count={count} setCount={setCount} />
                <div className="text-overlay">
                    <Text data={data[count]} />
                    <div className="dot-play">
                        <ul className="dots">
                            <li onClick={() => setCount(0)} className={count === 0 ? 'hero-dots orange' : 'hero-dots'}></li>
                            <li onClick={() => setCount(1)} className={count === 1 ? 'hero-dots orange' : 'hero-dots'}></li>
                            <li onClick={() => setCount(2)} className={count === 2 ? 'hero-dots orange' : 'hero-dots'}></li>
                        </ul>
                    </div>
                    <button className="view-products-button" onClick={handleViewProducts}>
                        View Products
                        <img src={arrowImage} alt="Arrow" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home;
