import app from './app.js';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js';

// Sets up .env path.
dotenv.config({ path: 'backend/config/config.env' })

// connects to the database.
connectDatabase();

// Listens on the specified port.
const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on port-${process.env.PORT} in mode-${process.env.NODE_ENV}`);
});