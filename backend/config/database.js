import mongoose from 'mongoose';

// Connects to the database and log out message.
const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI).then(res => {
        console.log(`${res.connection.host} is connected to Mongodb database successfully.`);
    });
}

export default connectDatabase;