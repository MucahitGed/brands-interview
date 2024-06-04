const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let products = [
  {
    "id": 1,
    "name": "Product 1",
    "description": "This is product 1",
    "price": 10.99
  },
  {
    "id": 2,
    "name": "Product 2",
    "description": "This is product 2",
    "price": 15.99
  }
];

// Yeni urun yaratma
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  newProduct.id = newId;
  products.push(newProduct);
  res.status(201).send(newProduct);
});

// Urunleri alma
app.get('/api/products', (req, res) => {
  res.send(products);
});

// secilen urunu alma
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).send('Product not found');
  res.send(product);
});

// secilen urunu guncelleme
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).send('Product not found');
  updatedProduct.id = id; 
  products[index] = updatedProduct;
  res.send(updatedProduct);
});

// secilen urunu silme
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).send('Product not found');
  products.splice(index, 1);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
