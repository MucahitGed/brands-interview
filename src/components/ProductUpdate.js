import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/ProductUpdate.css"

function ProductUpdate() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${productId}`)
      .then(response => {
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
      })
      .catch(error => {
        console.error('Urun Detaylarini Alirken Bir Hata Olustu: ', error);
      });
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/products/${productId}`, { name, description, price })
      .then(response => {
        console.log('Urun Basariyla Guncellendi: ', response.data);
        navigate(`/products/${productId}`);
      })
      .catch(error => {
        console.error('Urun Guncellenirken Bir Hata Olustu: ', error);
      });
  }

  return (
    <div className='product-update-body'>
    <div className='product-update-container'>
      <h2 className='product-update-header'>Urunu Guncelle</h2>
      <form onSubmit={handleSubmit}>
        <input className='product-update-input' type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <textarea className='product-update-text' placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input className='product-update-input' type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <button type="submit" className='product-update-button'>Urunu Guncelle</button>
      </form>
    </div>
    </div>
  );
}

export default ProductUpdate;
