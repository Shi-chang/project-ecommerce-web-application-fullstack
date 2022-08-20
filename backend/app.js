import express from 'express';
import errorMiddleWare from './middlewares/errors.js';
import cors from 'cors';
import bodyParser from 'body-parser';

import products from './routes/product.js';
import user from './routes/user.js';
import order from './routes/order.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    // origin: 'http://127.0.0.1:3000',
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// middleware that handles different routes
app.use('/api/v1', products);
app.use('/api/v1', user);
app.use('/api/v1', order);

// middleware that handles errors
app.use(errorMiddleWare);

export default app;
