import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion'; 
import './ProductCard.css';
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/productdetails/${product.id}`);
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCardClick}>
      <Card className='product-card'>
        <CardMedia
          component="img"
          className='product-image'
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="subtitle2" color="textSecondary">{product.brand}</Typography>
          <Typography variant="h6">₹{product.price}</Typography>
          <Button variant="contained" color="primary">Quick View</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
