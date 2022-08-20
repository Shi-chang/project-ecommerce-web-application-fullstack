import Product from "../models/product.js";
import products from "../data/products.json" assert{type: 'json'};
import dotenv from 'dotenv';
import connectDatabase from '../config/database.js';

// Configures the environment path and connects to the database
dotenv.config({ path: 'backend/config/config.env' });
connectDatabase();

// Deletes current products from the databse and creates new ones based 
// on "../data/products.json"
const seedProducts = async () => {
    try {
        // clear existing products
        await Product.deleteMany();
        console.log("Existing products deleted.\n");

        // create products
        await Product.insertMany(products);
        console.log("All products from the seeder.js have been created.\n");
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

console.log("111111111111");

seedProducts();