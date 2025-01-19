import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProductCard from './ProductCard';
import './ProductGrid.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ProductGrid = () => {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory;
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://two025-ln5f.onrender.com/perfumes')
      .then((response) => {
        setPerfumes(response.data.perfumes);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const filteredPerfumes = selectedCategory
    ? perfumes.filter((product) => product.gender === selectedCategory)
    : perfumes;

  const goBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  // Function to get background color based on selected category
  const getBackgroundColor = () => {
    switch (selectedCategory) {
      case 'Men':
        return 'blue'; // Change to your desired blue color
      case 'Women':
        return 'pink'; // Change to your desired pink color
      case 'Unisex':
        return 'lightgreen'; // Change to your desired color for Unisex
      default:
        return 'white'; // Default background color
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">Error fetching perfumes: {error.message}</Typography>;
  }

  return (
    <div className="product-grid-container" style={{ backgroundColor: getBackgroundColor() }}>
      <motion.div
        className="product-grid"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            fontSize: '38px',
            color: 'black',
            cursor: 'pointer',
          }}
          onClick={goBack} // Use goBack function here
        />
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {filteredPerfumes.length > 0 ? (
              filteredPerfumes.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Typography variant="h6">No products available for the selected category</Typography>
            )}
          </Grid>
        </Container>
      </motion.div>
    </div>
  );
};

export default ProductGrid;