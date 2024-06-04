import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <div>
      <Header/>
      <h2>404 Not Found</h2>
      <p>Aradiginiz sayfa bulunamadi.</p>
      <Footer/>
    </div>
  );
}

export default NotFound;
