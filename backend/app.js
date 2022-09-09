import express, { application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import productsRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
import stripeRoute from './routes/stripe.js';
import errorMiddleWare from './middlewares/errorMiddleware.js';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Sets up .env path.
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Uses JSON parser and body parser for all non-webhook routes. The reason for this is that the 
// webhook endpoint (in stripe.js) needs to take the raw request to do signature check. Modifying 
// the request before the check would normally result in a stripe error - "Wehook error. No signatures
// found matching the expected signature for payload."

// https://github.com/stripe/stripe-node/blob/master/examples/webhook-signing/node-express/express.js
app.use((req, res, next) => {
    if (req.originalUrl === `/stripe/webhook`) {
        next();
    } else {
        express.json({ limit: '10mb' })(req, res, next);
        bodyParser.urlencoded({ limite: '10mb', extended: true });
    }
});

app.use(cookieParser());
app.use(fileUpload());

// Middleware that handles different routes.
app.use(productsRoutes);
app.use(userRoutes);
// app.use(paymentRoute);
app.use(orderRoutes);
app.use("/stripe", stripeRoute);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

// Middleware that handles errors based on the mode of the project. The errorMiddleware helps generate
// an informative error message and sends the message back to the frontend in the production mode.
app.use(errorMiddleWare);

export default app;
