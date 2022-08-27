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

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

// The Home component.
const Home = () => {
    // The default current page is the first page.
    const [currentPage, setCurrentPage] = useState(1);
    // The default price range is $0.1-$9999
    const [price, setPrice] = useState([1, 2000]);
    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products);
    const params = useParams();
    const keyword = params.keyword;

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearProductsErrors());
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
                    <>
                        <MetaData title={`Best deals online!`} />
                        <div className="d-flex justify-content-center align-items-center">
                            <h2 className='text-center' id="products-heading">Welcome to All You Need!</h2>
                        </div>
                        <section id="products" className="container mt-5">
                            <div className="row">
                                {keyword ? (
                                    <div className='col-6 col-md-12'>
                                        <div className="row">
                                            {keyword ? (
                                                <>
                                                    <div className='col-6 col-md-3 mt-3 mb-3'>
                                                        <div className='px-5'>
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

                                                </>
                                            ) : (products.map(product => (
                                                <Product key={product._id} product={product} col={3} />
                                            )))}
                                        </div>
                                    </div>
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
                </>
            )}
        </>
    )
}

export default Home;
