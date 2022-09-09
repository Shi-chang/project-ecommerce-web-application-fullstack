import React from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layout/Loader.js';
import { myOrders } from '../../actions/orderActions.js';
import { useEffect } from 'react';
import { clearLoadOrderErrors } from '../../reducers/ordersSlice.js';

const Orders = () => {
    const dispatch = useDispatch();
    const { loading, orders, error } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            alert(error.message);
            dispatch(clearLoadOrderErrors());
        }

    }, [error, dispatch]);

    const getOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order Id",
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: "Number of Items",
                    field: 'numberOfItems',
                    sort: 'asc'
                },
                {
                    label: "Amount",
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: "Order Status",
                    field: 'orderStatus',
                    sort: 'asc'
                },
                {
                    label: "Actions",
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numberOfItems: order.orderItems.length,
                amount: `$ ${order.totalPrice}`,
                orderStatus: order.orderStatus === "delivered" ?
                    <p style={{ color: 'green' }}>{order.orderStatus}</p> :
                    <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className='fa fa-eye'></i>
                    </Link>
            });
        });

        return data;
    }

    return (
        <>
            <MetaData title="My Orders" />

            <h3 className='text-center my-4'>My Orders</h3>
            {loading ? <Loader /> : (
                <MDBDataTable
                    data={getOrders()}
                    className="px-2"
                    bordered
                    striped
                    hover
                />
            )}
        </>
    )
}

export default Orders;