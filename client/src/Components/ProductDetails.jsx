import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { IonIcon } from '@ionic/react';
import { cartOutline, arrowBack } from 'ionicons/icons';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animateCartIcon, setAnimateCartIcon] = useState(false);
  const [itemlength, setItemlength] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/perfumes')
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

  const handleClick = () => {
    if (product) {
      setAnimateCartIcon(true);
      setTimeout(() => setAnimateCartIcon(false), 500);
      axios.post('http://localhost:3000/cart', {
        image: product.image,
        name: product.name,
        price: product.price
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      const amountInPaise = product.price * 100; // Convert the price to paise (required by Razorpay)
      
      var options = {
        key: "rzp_test_4hlUjhjcvWV9yq", 
        key_secret: "BNK1J4bpTtkFKGOsJobO6qsu",
        amount: amountInPaise, // Amount in paise
        currency: "INR",
        name: "Test User",
        description: `Purchase of ${product.name}`,
        handler: function(response) {
          alert('Payment ID: ' + response.razorpay_payment_id);
        },
        prefill: {
          name: "mithilesh",
          email: "kmithilesh5669@gmail.com",
          contact: "8778855348"
        },
        notes: {
          address: "Razorpay Corporate office"
        },
        theme: {
          color: "#1487c4"
        }
      };

      var rzp = new window.Razorpay(options);
      rzp.open();
    }
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
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: 'auto', maxWidth: '800px', margin: 'auto', position: 'relative', top: '130px', right: '120px' }}
              initial={{ opacity: 0, x: -900 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ position: 'relative' }}>
              <IonIcon
                icon={arrowBack}
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: '1250px',
                  fontSize: '38px',
                  color: 'black',
                  cursor: 'pointer'
                }}
                onClick={gotoproduct}
              />
              <motion.div
                style={{ position: 'relative', width: '100%', maxWidth: '600px' }}
                animate={animateCartIcon ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <IonIcon
                  icon={cartOutline}
                  style={{
                    position: 'absolute',
                    top: '49px',
                    fontSize: '38px',
                    left: '600px',
                    color: 'black',
                    cursor: 'pointer'
                  }}
                  onClick={retrieve}
                >{itemlength}</IonIcon>
              </motion.div>
            </div>  
            <Typography variant="h4" sx={{ color: 'black', mb: 2, position: 'relative', top: '60px', left: '130px', fontSize: '55px' }}>
              {product.name}
            </Typography>
            <Typography variant="h6" sx={{ color: 'black', mb: 2, position: 'relative', top: '60px', left: '130px', fontSize: '40px' }}>
              {product.brand}
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'black', mb: 2, position: 'relative', top: '60px', left: '130px', fontSize: '20px' }}>
              {product.description}
            </Typography>
            <Typography variant="h5" sx={{ color: 'black', mb: 2, position: 'relative', top: '60px', left: '130px', fontSize: '40px', fontWeight: 'bold' }}>
              ₹{product.price}
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', mb: 2, position: 'relative', top: '60px', left: '130px', fontSize: '25px' }} dangerouslySetInnerHTML={{ __html: product.Highlights }} />
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: 'Orange', mb: 2, width: '100%', position: 'relative', top: '60px', left: '130px', padding: '20px', fontSize: '23px' }}
              onClick={handleClick}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ backgroundColor: 'orangered', width: '100%', position: 'relative', top: '60px', left: '130px', padding: '20px', fontSize: '23px' }}
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
