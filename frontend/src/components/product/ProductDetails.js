import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearErrors } from '../../actions/productActions.js';
import Loader from '../layout/Loader.js';
import MetaData from '../layout/MetaData.js';
import { useParams } from 'react-router-dom';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { addItemToCart } from '../../actions/cartActions.js';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const params = useParams();

    const [quantity, setQuantity] = useState(1);

    const { user } = useSelector(state => state.user);
    const { loading, product, error } = useSelector(state => state.productDetails);
    useEffect(() => {
        dispatch(getProductDetails(params.id));
        if (error) {
            alert(error);
            dispatch(clearErrors());
            return;
        }

    }, [dispatch, error, params.id]);

    const increaseQuantity = () => {
        const count = document.querySelector('.count');
        if (count.valueAsNumber >= product.stock) {
            return;
        }
        const quantity = count.valueAsNumber + 1;
        setQuantity(quantity);
    }

    const decreaseQuantity = () => {
        const count = document.querySelector('.count');
        if (count.valueAsNumber <= 1) {
            return;
        }
        const quantity = count.valueAsNumber - 1;
        setQuantity(quantity);
    }

    const addToCart = () => {
        if (!user) {
            alert("Please login first.");
            return;
        }

        dispatch(addItemToCart(params.id, quantity));
        alert("The product has been added to your cart.");
    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData meta={product.name} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product-image">
                            <Carousel pause='hover'>
                                {
                                    product.images && product.images.map(image => {
                                        return (
                                            <CarouselItem key={image.public_id}>
                                                <img className='d-block w-100' src={image.url} alt={product.name} />
                                            </CarouselItem>)
                                    })
                                }
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product-id">{`Product ID: ${product._id}`}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no-of-reviews">({product.numberOfReviews} reviews)</span>

                            <hr />

                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQuantity}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQuantity}>+</span>
                            </div>
                            <button type="button" id="cart-btn" className="btn btn-primary d-inline ml-4" onClick={addToCart} disabled={product.stock === 0}>Add to Cart</button>

                            <hr />

                            <p>Status: <span id="stock-status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                            <button id="review-btn" type="button" className="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#ratingModal">
                                Submit My Review
                            </button>
                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Do you like it?</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea name="review" id="review" className="form-control mt-3">
                                                    </textarea>
                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-bs-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>

    )
}

export default ProductDetails;