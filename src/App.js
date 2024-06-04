import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct'; 
import DetailProduct from './pages/DetailProduct';
import UpdateProduct from './pages/UpdateProduct';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<RequireAuth><Home/></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products/:productId" element={<DetailProduct />} />
          <Route path="/update-product/:productId" element={<UpdateProduct />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function RequireAuth({ children }) {
  const { accessToken } = React.useContext(AuthContext);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default App;