import React from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions.js';
import { useDispatch, useSelector } from 'react-redux';
import Payment from './Payment.js';

// The Cart component that handles CRUD operations of the shopping cart.
const Cart = () => {
    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.userInfo.user);

    const increaseQuantity = (productId, quantity, stock) => {
        const newQuantity = quantity + 1;
        if (newQuantity > stock) {
            return;
        }

        dispatch(addItemToCart(productId, newQuantity));
    }

    const decreaseQuantity = (productId, quantity) => {
        const newQuantity = quantity - 1;
        if (newQuantity < 1) {
            return;
        }

        dispatch(addItemToCart(productId, newQuantity));
    }

    const handleRemoveCartItem = (productId) => {
        dispatch(removeItemFromCart(productId));
    }

    return (
        <div className='cart-wrapper container'>
            {cartItems.length === 0 ? <h3 className="mt-5 text-center">Hi, your cart is empty</h3> : (
                <>
                    <MetaData title="My Cart" />
                    <h2 className="mt-5 text-start">Products in your cart - <b>{cartItems.length}</b> products</h2>

                    <div className="row justify-content-center">
                        <div className="col-12 col-md-9">
                            {cartItems.map(item => (
                                <div key={item.productId} className="cart-item">
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img src={item.image} alt={item.name} height="90" width="115" />
                                        </div>

                                        <div className="col-5 col-lg-3">
                                            <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                        </div>
                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">{item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus" onClick={() => decreaseQuantity(item.productId, item.quantity, item.stock)}>-</span>
                                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                <span className="btn btn-primary plus" onClick={() => increaseQuantity(item.productId, item.quantity)}>+</span>
                                            </div>
                                        </div>
                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => handleRemoveCartItem(item.productId)}></i>
                                        </div>

                                    </div>
                                </div>
                            ))}
                            <hr />
                        </div>

                        <div className="col-12 col-md-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((accumulator, current) => (accumulator + current.quantity), 0)} pc(s)</span></p>
                                <p>Est. total: <span className="order-summary-values">${cartItems.reduce((accumulator, current) => (accumulator + current.price * current.quantity), 0).toFixed(2)}</span></p>
                                <hr />

                                <Payment />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart;