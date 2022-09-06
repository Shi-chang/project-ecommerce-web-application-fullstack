import React, { useState } from 'react';
import MetaData from '../layout/MetaData.js';
import { saveShippingInformation } from '../../actions/cartActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import countryList from 'country-list';
import CheckoutSteps from './CheckoutSteps.js';

const Shipping = () => {
    const { shippingInfo } = useSelector(state => state.cart);

    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(saveShippingInformation({ country, city, address, postCode, name, phoneNumber }));
        navigate('/order/confirm');
    }

    return (
        <>
            <MetaData title="Shipping Information" />
            <CheckoutSteps shippingInfo />
            <div className="row wrapper">
                <div className="user-info-div">
                    <form className="shadow-lg" onSubmit={handleSubmit}>
                        <h2 className="text-center mb-4">Shipping Information</h2>
                        <div className="form-group">
                            <label htmlFor="country-field">Country</label>
                            <select
                                id="country-field"
                                className="form-select"
                                value={country ? country : "DEFAULT"}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                <option key="DEFAULT" value="DEFAULT" hidden disabled>Select a country...</option>
                                {countryList.getNames().sort().map(name => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="city-field">City</label>
                            <input
                                type="text"
                                id="city-field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="address-field1">Address</label>
                            <input
                                type="text"
                                id="address-field1"
                                className="form-control"
                                value={address}
                                placeholder="Street address or P.O. box"
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />

                            <input
                                type="text"
                                id="address-field2"
                                className="form-control mt-2"
                                placeholder='Apartment, suite, unit, building'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="form-group  mt-3">
                            <label htmlFor="post-code-field">Post Code</label>
                            <input
                                type="text"
                                id="post-code-field"
                                className="form-control"
                                value={postCode}
                                onChange={(e) => setPostCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group  mt-3">
                            <label htmlFor="name-field">Name</label>
                            <input
                                type="text"
                                id="name-field"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group  mt-3">
                            <label htmlFor="phone-field">Phone Number</label>
                            <input
                                type="tel"
                                id="phone-field"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className='d-flex justify-content-center'>
                            <button
                                id="primary-button"
                                type="submit"
                                className="btn"
                            >
                                Proceed
                            </button>
                        </div>
                    </form>
                </div>
            </div >

        </>
    )
}

export default Shipping;