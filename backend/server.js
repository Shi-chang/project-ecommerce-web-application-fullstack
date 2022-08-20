import app from './app.js';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js'

// handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.stack}`);
    console.log('Shutting down the surver due to uncaught exception');
    process.exit(1);
});

// set up .env path
dotenv.config({ path: 'backend/config/config.env' });

// connect to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on port-${process.env.PORT} in mode-${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
});
