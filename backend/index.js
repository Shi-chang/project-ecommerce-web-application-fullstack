import app from './app.js';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import connectDatabase from './config/database.js';

// Sets up .env path.
dotenv.config({ path: 'backend/config/config.env' })

// connects to the database.
connectDatabase();

// Sets up configuration for cloudinary.
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// Listens on the specified port.
const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on port-${process.env.PORT} in mode-${process.env.NODE_ENV}`);
});
