import React, { useEffect } from 'react';
import webfont from "webfontloader";
import Header from './header/header';
import Footer from './footer/footer';
import './App.css';
import Banner from './banner/banner';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './component/Home';
import Product from './component/productdetails';
import Allproducts from './component/allproducts';
import  Login from './component/userlogin/login';
import Profile from './component/profile';
import Prof from './component/prof';
import Reset from './component/resetpass';
import { Cart } from './component/cart';
import Shipping from './component/payment/shipping';
import Confirm from './component/payment/confirm';
import Dashboard from './component/dashboard';
function App() {
  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka", "Poppins"]
      }
    });
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Products" element={<Allproducts />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path='/login' element={<Profile/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/reset/password/:token" element={<Reset/>} />
            <Route path="/shipping" element={<Shipping/>} />
            <Route path="/confirm" element={<Confirm/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            
          </Routes>

        </main>
        <Footer />
      </div>
    </Router>
  );
  
}

export default App;
