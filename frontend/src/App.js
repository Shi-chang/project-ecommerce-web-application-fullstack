import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import ProductDetails from './components/product/ProductDetails';
import Profile from './components/user/Profile';
import Cart from './components/cart/Cart';
import { loadUser } from './actions/userActions';
import store from './store';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';
import PORT from './components/route/routeConstants';
import Payment from './components/cart/Payment';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// The app component.
function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  // When the home page is re-rendered, try to automatically login the user using token cookies 
  // stored in the browser.
  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }

      const url = `${PORT}/stripeapikey`;

      const keyData = await axios.get(url, config);
      console.log(keyData);
      setStripeApiKey(keyData.data.stripeApiKey);
    }
    getStripeApiKey();

  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search/:keyword' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} />

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/me' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
            <Route path='/me/update' element={<ProtectedRoute> <UpdateProfile /> </ProtectedRoute>} />
            <Route path='/password/update' element={<ProtectedRoute> <UpdatePassword /> </ProtectedRoute>} />
            <Route path='/password/forgot' element={<ForgotPassword />} />
            <Route path='/password/reset/:token' element={<ResetPassword />} />

            <Route path='/cart' element={<Cart />} />
            <Route path='/shipping' element={<ProtectedRoute> <Shipping /></ProtectedRoute>} />
            <Route path='/order/confirm' element={<ProtectedRoute> <ConfirmOrder /> </ProtectedRoute>} />
            {stripeApiKey &&
              <Route path='/payment' element={
                <Elements stripe={loadStripe(stripeApiKey)} >
                  <Payment />
                </Elements>
              } />
            }

            {/* <Route path='/payment' element={<Payment stripe={loadStripe(stripeApiKey)} />} /> */}

            {/* {stripeApiKey &&
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Route path='/payment' element={<ProtectedRoute> <Payment /> </ProtectedRoute>} />
              </Elements>
            } */}

          </Routes>
        </div>
        <Footer />
      </div >
    </BrowserRouter >
  );
}

export default App;
