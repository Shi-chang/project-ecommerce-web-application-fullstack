import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
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
import CheckoutSuccess from './components/cart/CheckoutSuccess';

// The app component.
function App() {
  // When the home page is re-rendered, try to automatically login the user using token cookies 
  // stored in the browser.
  useEffect(() => {
    store.dispatch(loadUser());
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

            <Route path='/checkout-success' element={<CheckoutSuccess />} />

          </Routes>
        </div>
        <Footer />
      </div >
    </BrowserRouter >
  );
}

export default App;
