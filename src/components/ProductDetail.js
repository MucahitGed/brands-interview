import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/ProductDetail.css";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Urun detaylarini alirken bir hata olustu: ', error);
      });
  }, [productId]);

  return (
    <div className="product-detail-container">
  <h2 className="product-detail-title">Urun Detayi</h2>
  {product ? (
    <div className="product-detail">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Fiyat: TL{product.price}</p>
    </div>
  ) : (
    <p className="loading-text">Yukleniyor...</p>
  )}
</div>
  );
}

export default ProductDetail;
