import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/ProductList.css"
function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
     .then(response => {
        setProducts(response.data); 
        console.log(response.data)
      })
     .catch(error => {
        console.error('Urunler alinirken bir hata olustu: ', error);
      });
  }, []);

  const handleDelete = (productId) => {
    axios.delete(`http://localhost:3000/api/products/${productId}`)
     .then(response => {
        console.log('Urun Basariyla Silindi');
        setProducts(products.filter(product => product.id!== productId));
      })
     .catch(error => {
        console.error('Urun Silinirken Bir Hata Olustu: ', error);
      });
  }

  return (
    <div>
      <h2 className="product-list-header">Urun Listesi</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-list-item">
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-price">{product.price}</span>
            </div>
            <div className="product-buttons">
              <button className="product-button" onClick={() => navigate(`/products/${product.id}`)}>Detay</button>
              <button className="product-button" onClick={() => navigate(`/update-product/${product.id}`)}>Guncelle</button>
              <button className="product-button" onClick={() => handleDelete(product.id)}>Sil</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;