import React, { useState } from 'react';
import axios from 'axios';
import "../styles/ProductForm.css"
import { useNavigate } from 'react-router-dom';

function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/products', { name, description, price })
      .then(response => {
        console.log('Urun Basariyla Eklendi: ', response.data);
        navigate("/");
      })
      .catch(error => {
        console.error('Urun Yuklemede Hata: ', error);
      });
  }

  return (
    <div className='form-body'>
    <div class="form-container">
      <h2>Urun Ekle</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} class="form-input" required/>
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} class="form-input" required/>
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} class="form-input" required/>
        <button type="submit" class="form-submit">Urun Ekle</button>
      </form>
    </div>
    </div>
  );
}

export default ProductForm;
