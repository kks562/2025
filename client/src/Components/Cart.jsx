import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, CardActions, AppBar, Toolbar } from '@mui/material';
import { motion } from 'framer-motion';
import { IonIcon } from '@ionic/react';
import { cartOutline, arrowBack } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const gotoproducts = () => {
    navigate('/products');
  };

  const fetchCartItems = () => {
    axios.get('http://localhost:3000/read')
      .then(response => {
        setCartItems(response.data);
        console.log('Fetched cart items:', response.data); 
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/cart/${id}`)
      .then(() => {
        const updatedCartItems = cartItems.filter(item => item._id !== id);
        setCartItems(updatedCartItems);
        console.log('Updated cart items after delete:', updatedCartItems); 
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
    console.log('Total price:', totalPrice);
    return totalPrice;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = calculateTotalPrice();

    if (totalPrice <= 0) {
      alert('Cart is empty. Please add items to your cart.');
      return;
    }

    var options = {
      key: "rzp_test_4hlUjhjcvWV9yq", 
      key_secret: "BNK1J4bpTtkFKGOsJobO6qsu", 
      amount: totalPrice * 100, 
      currency: "INR",
      name: "Test User",
      description: "Test Transaction",
      handler: function(response) {
        alert('Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: "mithilesh",
        email: "kmithilesh5669@gmail.com",
        contact: "8778855348"
      },
      note: {
        address: "Razorpay Corporate office"
      },
      theme: {
        color: "#1487c4"
      }
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: 'black' }}>
        <Button onClick={gotoproducts} sx={{ position: 'absolute', top: '15px', left: '20px', minWidth: 'auto' }}>
          <IonIcon
            icon={arrowBack}
            style={{
              fontSize: '50px',
              position:'relative',
              top:'-10px',
              color: 'white',   
              cursor: 'pointer'
            }}
       onClick={gotoproducts}   />
        </Button>
        <IonIcon
          icon={cartOutline}
          style={{
            position: 'absolute',
            top: '13px',
            right: '728px',
            fontSize: '38px',
            color: 'white',
            cursor: 'pointer'
          }}
        />
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: 'white', flexGrow: 1, textAlign: 'center', position: 'relative', left: '110px', fontSize: '40px' }}>
            Cart
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', background: 'linear-gradient(to right, #ff7e5f, #feb47b)', padding: '5px 10px', borderRadius: '5px', position: 'relative', right: '50px' }}>
            Total Price: ₹{calculateTotalPrice().toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              width: '150px',
              padding: '13px',
              fontWeight: '600',
              letterSpacing: '2px',
              background: 'linear-gradient(to right, #ff416c, #ff4b2b)', // Gradient colors
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(to right, #ff4b2b, #ff416c)', // Reverse gradient on hover
              }
            }}
          >
            Checkout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: '20px' }}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card sx={{ height: 430 }}>
                    <CardMedia
                      component="img"
                      sx={{ height: 300, objectFit: 'cover' }}
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography> 
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Price: ₹{item.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(item._id)}
                        style={{ alignItems: 'center', position: 'relative', left: '80px', bottom: '17px' }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Cart;
