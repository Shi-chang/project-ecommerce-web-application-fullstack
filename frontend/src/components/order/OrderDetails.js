import React from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader.js';
import { useEffect } from 'react';
import { clearOrderDetailsErrors } from '../../reducers/orderDetailsSlice.js';
import { getOrderDetails } from '../../actions/orderActions.js';
import { useParams } from 'react-router';

/**
 * The order details component.
 * 
 * @returns the content that renders the order details component
 */
const OrderDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { loading, orderDetails = {}, error } = useSelector(state => state.orderDetails);
    const { orderItems, subtotalPrice, taxPrice, shippingPrice, totalPrice, shippingInfo, paymentInfo, paidAt, orderStatus } = orderDetails;

    useEffect(() => {
        dispatch(getOrderDetails(params.id));

        if (error) {
            alert(error.message);
            dispatch(clearOrderDetailsErrors());
        }

    }, [error, dispatch, params.id]);

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`;

    return (
        <>
            <MetaData title="Order Details" />

            {loading ? <Loader /> : (
                <>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-lg-8 mt-3 order-details">
                            <h3 className="mt-4">Order ID: {orderDetails._id}</h3>

                            <hr />
                            <h4 className="mb-4">Shipping Info</h4>
                            <p><b>Name:</b> {shippingInfo && shippingInfo.name}</p>
                            <p><b>Email:</b> {shippingInfo && shippingInfo.email}</p>
                            <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNumber}</p>
                            <p className="mb-4"><b>Address:</b>{shippingDetails}</p>

                            <hr />
                            <h4 className="mb-4">Cost Info</h4>
                            <p><b>Subtotal:</b> ${(subtotalPrice / 100).toFixed(2)}</p>
                            <p><b>Tax:</b> ${(taxPrice / 100).toFixed(2)}</p>
                            <p><b>Shipping:</b> ${(shippingPrice / 100).toFixed(2)}</p>
                            <p><b>Total:</b> ${(totalPrice / 100).toFixed(2)}</p>

                            <hr />
                            <h4 className="my-4">Payment Info</h4>
                            <p><b>Status: </b><span className={paymentInfo && paymentInfo.status === 'paid' ? "greenColor" : "redColor"}>{paymentInfo && paymentInfo.status}</span></p>
                            <p><b>Paid at:</b> {paidAt.substring(0, 10)} {paidAt.substring(11, 19)}</p>

                            <hr />
                            <h4 className="my-4">Order Status:</h4>
                            <p className={orderDetails.orderStatus === 'Delivered' ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>

                            <h4 className="my-4">Order Items:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
                                    <div key={item.productId} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default OrderDetails;