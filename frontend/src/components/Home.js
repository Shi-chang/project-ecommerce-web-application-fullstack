import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from './layout/MetaData';
import { getProducts } from '../actions/productActions.js';
import Product from './product/Product.js';
import Loader from './layout/Loader.js';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0.1, 9999]);

    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products);

    const params = useParams();
    const keyword = params.keyword;

    useEffect(() => {
        if (error) {
            alert(error);
            return;
        }

        dispatch(getProducts(keyword, currentPage, price));

    }, [dispatch, error, keyword, currentPage, price]);

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={`Best deals online!`} />
                    <h1 className='text-center' id="products-heading">Welcome to All You Need!</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">

                            {keyword ? (
                                <>
                                    <div className="col-6 col-md-3 my-3">
                                        <div className='px-3'>
                                            <Range
                                                marks={{
                                                    0.1: '$0.1',
                                                    9999: '$9999'
                                                }}
                                                min={0.1}
                                                max={9999}
                                                defaultValue={[0.1, 9999]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                pushable={true}
                                                onChange={price => setPrice(price)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-6 col-md-9'>
                                        <div className="row">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                products && products.map(product => (
                                    <Product key={product._id} product={product} />
                                ))
                            )}

                        </div>
                    </section>
                    {resPerPage <= productsCount && (
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
            )}
        </>
    )
}

export default Home;
