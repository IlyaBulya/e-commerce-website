import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const product = await fetchProductDetails(id);
      setProduct(product);
    };
    getProduct();
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    product && (
      <div className="product-details">
        <img src={product.image} alt={product.title} className="product-image" />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    )
  );
};

export default ProductDetails;
