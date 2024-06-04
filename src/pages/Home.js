import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import '../styles/Home.css';

function Home(){
  return (
    <div className="home-container">
      <Header />
      <div className="home-header">
        <h2>Online Urun Sistemi</h2>
        <Link to="/add-product">
          <button className="home-button">Urun Ekle</button>
        </Link>
      </div>
      <div className="home-content">
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Home;