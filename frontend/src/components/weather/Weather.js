import React, { useEffect, useState } from 'react';

// The weather component.
const Weather = ({ isWhetherOpen, onClose }) => {
    const [city, setCity] = useState("Vancouver");
    const initialData = {
        main: {
            temp: 300,
            temp_max: 300,
            temp_min: 290
        },
        weather: [
            { main: 'Clouds' }
        ]
    };
    const [data, setData] = useState(initialData);
    const [input, setInput] = useState("");
    const isComponentMounted = true;
    useEffect(() => {
        const fetchWeather = async () => {
            const apiKey = '9d4997d1dc6eae36a7dffd8bad876602';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            if (isComponentMounted) {
                setData(await response.json());
            }
            return () => {
                isComponentMounted = false;
            }
        }
        fetchWeather();
    }, [city]);
    let temp = (data.main.temp - 273.15).toFixed(0);
    let temp_max = (data.main.temp_max - 273.15).toFixed(0);
    let temp_min = (data.main.temp_min - 273.15).toFixed(0);
    let weatherCondition = data.weather[0].main;
    let weatherIcon = "";
    switch (weatherCondition) {
        case 'Thunderstorm':
            weatherIcon = "fa-bolt";
            break;
        case 'Clouds':
            weatherIcon = "fa-cloud";
            break;
        case 'Drizzle':
            weatherIcon = "fa-cloud-rain";
            break;
        case 'Rain':
            weatherIcon = "fa-cloud-showers-heavy";
            break;
        case 'Snow':
            weatherIcon = "fa-snowflake";
            break;
        default:
            weatherIcon = "fa-smog";
    }

    // Get the date strings
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString('default', { month: 'short' });
    let day = d.toLocaleString('default', { weekday: 'long' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setCity(input);
    }

    return (
        isWhetherOpen ? (
            < div className='modal-weather container mt-5' >
                <div className="row justify-content-center">
                    <div className="col-12 col-md-4">
                        <div className="card text-white text-center border-0">
                            <img src={`https://source.unsplash.com/600x900/?${weatherCondition}`} className="card-img" alt="image from unsplash.com" />
                            <div className="card-img-overlay">
                                <div className='text-end'>
                                    <i className="fa fa-xmark justify-content-end" onClick={onClose}></i>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4 w-75 mx-auto">
                                        <input
                                            type="search"
                                            className="form-control"
                                            placeholder="City name"
                                            aria-label="Search cith"
                                            aria-describedby="basic-addon2"
                                            name='city'
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)
                                            }
                                        />
                                        <div className="input-group-append">
                                            <button type='submit' className='btn btn-secondary text-white'>
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3" >
                                    <h2 className="card-title">{city}</h2>
                                    <p className="card-text lead">{day} {month} {date}, {year}
                                    </p>
                                    <hr />
                                    <i className={`fas ${weatherIcon} fa-3x`}></i>
                                    <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
                                    <p className='fw-bolder mb-0 lead'>{weatherCondition}</p>
                                    <p className="lead fw-bolder">{temp_min} &deg;C - {temp_max} &deg;C</p>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        ) : null
    )
}

export default Weather;
