import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  AppBar,
  Toolbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
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
    const token = localStorage.getItem('token');
    axios
      .get('https://two025-ln5f.onrender.com/read', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`https://two025-ln5f.onrender.com/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const updatedCartItems = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCartItems);

        const newItemLength = updatedCartItems.length;
        localStorage.setItem('itemlength', newItemLength);
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = calculateTotalPrice();

    if (totalPrice <= 0) {
      alert('Cart is empty. Please add items to your cart.');
      return;
    }

    const options = {
      key: 'rzp_test_4hlUjhjcvWV9yq',
      key_secret: 'BNK1J4bpTtkFKGOsJobO6qsu',
      amount: totalPrice * 100,
      currency: 'INR',
      name: 'Test User',
      description: 'Test Transaction',
      handler: function (response) {
        alert('Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'mithilesh',
        email: 'kmithilesh5669@gmail.com',
        contact: '8778855348',
      },
      notes: {
        address: 'Razorpay Corporate office',
      },
      theme: {
        color: '#1487c4',
      },
    };

    if (window.Razorpay) {
      const pay = new window.Razorpay(options);
      pay.open();
    } else {
      alert('Razorpay SDK is not loaded.');
    }
  };

  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Button onClick={gotoproducts} sx={{ color: 'white' }}>
            <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '24px' }} />
          </Button>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            Cart
          </Typography>
          <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '24px', color: 'white' }} />
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
                        sx={{ marginLeft: 'auto' }}
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
        <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '20px' }}>
          Total Price: ₹{calculateTotalPrice().toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            display: 'block',
            margin: '20px auto',
            padding: '10px 30px',
            background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(to right, #ff4b2b, #ff416c)',
            },
          }}
        >
          Checkout
        </Button>
      </Container>
    </div>
  );
};

export default Cart;
