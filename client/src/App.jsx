import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Home';
import ProductGrid from './Components/ProductGrid';
import ProductDetails from './Components/ProductDetails';
import About from './Components/About';
import Contact from './Components/Contact';
import Cart from './Components/Cart';
import Payment from './Components/Payment';

const App = () => {
  return (
   
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login/>} /> 
          <Route path="/home" element={<Home/>} />
          <Route path="/products" element={<ProductGrid/>}/>
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/payment' element={<Payment/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
