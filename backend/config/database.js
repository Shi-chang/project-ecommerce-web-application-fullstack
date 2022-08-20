import mongoose from 'mongoose';

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(res => {
        console.log(`${res.connection.host} is connected to Mongodb database successfully.`);
    });
}

export default connectDatabase;