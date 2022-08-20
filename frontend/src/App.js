import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import Home from './components/Home.js';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/product/ProductDetails.js';
import Login from './components/user/Login.js';
import Register from './components/user/Register.js';
import { loadUser } from './actions/userActions.js';
import store from './store';
import { useEffect } from 'react';
import Cart from './components/cart/Cart.js';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container-fluid">
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/search/:keyword' element={<Home />} exact />
            <Route path='/product/:id' element={<ProductDetails />} exact />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} exact />
            <Route path='/cart' element={<Cart />} exact />
          </Routes>
        </div>
        <Footer />
      </div >
    </BrowserRouter >
  );
}

export default App;
