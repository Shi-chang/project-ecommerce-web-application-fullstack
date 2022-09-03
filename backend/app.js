import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import productsRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
import errorMiddleWare from './middlewares/errorMiddleware.js';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Sets up .env path.
dotenv.config({ path: 'backend/config/config.env' })

app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.urlencoded({ limite: '10mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Middleware that handles different routes. The products and user routes are mostly accomplished both
// in the front end and back end. But the order fuction is not finished yet in the front end.
app.use(productsRoutes);
app.use(userRoutes);
app.use(orderRoutes);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

// middleware that handles errors
app.use(errorMiddleWare);

export default app;
