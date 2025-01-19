import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './ProjectDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animateCartIcon, setAnimateCartIcon] = useState(false);
  const [itemlength, setItemlength] = useState(0);

  useEffect(() => {
    // Fetch product details
    axios.get('https://two025-ln5f.onrender.com/perfumes')
      .then(response => {
        const fetchedProduct = response.data.perfumes.find(p => String(p.id) === String(id));
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Fetch cart items for the logged-in user
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://two025-ln5f.onrender.com/read', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setItemlength(response.data.length); // Set the cart item count
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
    }
  }, []);

  const handleClick = () => {
    if (product) {
      setAnimateCartIcon(true);
      setTimeout(() => setAnimateCartIcon(false), 500);

      const token = localStorage.getItem('token');
      axios.post('https://two025-ln5f.onrender.com/cart', {
        image: product.image,
        name: product.name,
        price: product.price
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response);
        // Fetch updated cart items after adding a new item
        return axios.get('https://two025-ln5f.onrender.com/read', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      })
      .then(response => {
        setItemlength(response.data.length); // Update cart item count
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  const handleBuyNow = () => {
    // ... (same as before)
  };

  const retrieve = () => {
    navigate('/cart');
  };

  const gotoproduct = () => {
    navigate('/products');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    product && (
      <Container maxWidth="lg" sx={{ padding: '20px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.img
              src={product.image}
              alt={product.name}
              className="image-default"
              initial={{ opacity: 0, x: -900 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', marginBottom: '20px' }}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  fontSize: '30px',
                  color: 'black',
                  cursor: 'pointer'
                }}
                onClick={gotoproduct}
              />
              <motion.div
                style={{ position: 'relative', marginLeft: 'auto', width: 'max-content' }}
                animate={animateCartIcon ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{
                    fontSize: '30px',
                    color: 'black',
                    cursor: 'pointer'
                  }}
                  onClick={retrieve}
                />
                {itemlength}
              </motion.div>
            </Box>
            <Typography variant="h4" sx={{ color: 'black', mb: 2, fontSize: { xs: '24px', md: '36px' }, fontWeight: 'bold' }}>
              {product.name}
            </Typography>
            <Typography variant="h6" sx={{ color: 'black', mb: 2, fontSize: { xs: '18px', md: '28px' } }}>
              {product.brand}
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'black', mb: 2, fontSize: { xs: '14px', md: '18px' } }}>
              {product.description}
            </Typography>
            <Typography variant="h5" sx={{ color: 'black', mb: 2, fontSize: { xs: '20px', md: '32px' }, fontWeight: 'bold' }}>
              ₹{product.price}
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', mb: 2, fontSize: { xs: '14px', md: '18px' } }} dangerouslySetInnerHTML={{ __html: product.Highlights }} />
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: 'orange', mb: 2, width: '100%', padding: { xs: '10px', md: '20px' }, fontSize: { xs: '16px', md: '23px' } }}
              onClick={handleClick}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ backgroundColor: 'orangered', width: '100%', padding: { xs: '10px', md: '20px' }, fontSize: { xs: '16px', md: '23px' } }}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  );
};

export default ProductDetails;