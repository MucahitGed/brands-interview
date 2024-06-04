const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

let users = [];

const secretKey = crypto.randomBytes(32).toString('hex');

// Login API
app.post('/api/auth/loginbyusername', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const accessToken = jwt.sign({ username: user.username, role: user.role }, secretKey);
    res.json({ accessToken, user_role: user.role });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Signup API
app.post('/api/auth/signup', (req, res) => {
  const { username, password, role } = req.body;
  if (!users.find(u => u.username === username)) {
    users.push({ username, password, role });
    res.json({ message: 'User created successfully' });
  } else {
    res.status(400).json({ error: 'Username already exists' });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token not provided' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});