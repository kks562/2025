import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProductCard from './ProductCard';
import './ProductGrid.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';

const ProductGrid = () => {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory;
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/perfumes')
      .then(response => {
        setPerfumes(response.data.perfumes);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const filteredPerfumes = selectedCategory
    ? perfumes.filter(product => product.gender === selectedCategory)
    : perfumes;

  const goToHome = () => {
    navigate('/home');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching perfumes: {error.message}</p>;
  }

  return (
    <div className="a">
      <motion.div
        className="product-grid"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3 }}
      >
        <IonIcon
          icon={arrowBack}
          style={{
            position: 'absolute',
            top: '40px',
            right: '1450px', 
            fontSize: '38px',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={goToHome}
        />
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {filteredPerfumes.map((product) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </motion.div>
    </div>
  );
};

export default ProductGrid;
