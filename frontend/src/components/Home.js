import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import MetaData from './layout/MetaData';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layout/Loader';
import 'rc-slider/assets/index.css';
import { clearProductsErrors } from '../reducers/productsSlice';
import { myOrders } from '../actions/orderActions.js';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

// The Home component.
const Home = () => {
    // The default current page is the first page.
    const [currentPage, setCurrentPage] = useState(1);
    // The default price range is $1-$2000
    const [price, setPrice] = useState([1, 2000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);

    const dispatch = useDispatch();
    const { loading, products, error, productsCount, filteredProductsCount, resPerPage } = useSelector(state => state.products);
    const { user } = useSelector(state => state.userInfo);

    const params = useParams();
    const keyword = params.keyword;

    const categories = [
        'Books',
        'Video Games',
        'Electronics & Computers',
        'Movies, TV Shows & Music',
        'Clothing & Shoes',
        'Sports & Outdoors',
        'Food & Drinks',
        'Toys & Kids'
    ]

    useEffect(() => {
        if (error) {
            if (error.message !== "Fail to fetch") {
                alert(error);
            }

            dispatch(clearProductsErrors());
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating));

        if (user) {
            dispatch(myOrders());
        }

    }, [user, dispatch, error, keyword, currentPage, price, category, rating]);

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount;
    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <>
                        <MetaData title={`Best deals online!`} />
                        <div className="d-flex justify-content-center align-items-center">
                            <h2 className='text-center' id="products-heading">Welcome to All You Need!</h2>
                        </div>
                        <section id="products" className="container mt-5">
                            <div className="row">
                                {keyword ? (
                                    <>
                                        <div className='col-6 col-md-3 mt-3 mb-3'>
                                            <div className='px-5'>
                                                <div>
                                                    <h4 className='mb-5'>Price Range</h4>
                                                    <Range
                                                        marks={{
                                                            1: '$1',
                                                            2000: '$2000'
                                                        }}
                                                        min={1}
                                                        max={2000}
                                                        defaultValue={[1, 2000]}
                                                        tipFormatter={value => `$${value}`}
                                                        tipProps={{
                                                            placement: 'top',
                                                            prefixCls: 'rc-slider-tooltip'
                                                        }}
                                                        value={price}
                                                        onChange={price => setPrice(price)}
                                                    />
                                                </div>

                                                <hr className='my-5' />

                                                <div className='mt-5'>
                                                    <h4 className="mb-3">
                                                        Categories
                                                    </h4>
                                                    <ul className='ps-0'>
                                                        {categories.map(category => (
                                                            <li style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                                key={category}
                                                                onClick={() => setCategory(category)}>
                                                                {category}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>


                                                <hr className='my-3' />

                                                <div className='mt-5'>
                                                    <h4 className="mb-3">
                                                        Ratings
                                                    </h4>

                                                    <ul className='ps-0'>
                                                        {[5, 4, 3, 2, 1, 0].map(star => (
                                                            <li style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                                key={star}
                                                                onClick={() => setRating(star)}>
                                                                <div className="rating-outer">
                                                                    <div className="rating-inner"
                                                                        style={{
                                                                            width: `${star * 20}%`
                                                                        }}>

                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>


                                            </div>
                                        </div>

                                        <div className='col-6 col-md-9'>
                                            <div className='row'>
                                                {
                                                    products.map(product => (
                                                        <Product key={product._id} product={product} col={4} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </>) : (
                                    products && products.map(product => (
                                        <Product key={product._id} product={product} col={3} />
                                    ))
                                )}
                            </div>
                        </section>
                        {resPerPage <= count && (
                            <div className="d-flex justify-content-center mt-5">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={handlePageChange}
                                    nextPageText={'⟩'}
                                    prevPageText={'⟨'}
                                    firstPageText={"«"}
                                    lastPageText={'»'}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        )}
                    </>
                </>
            )}
        </>
    )
}

export default Home;
