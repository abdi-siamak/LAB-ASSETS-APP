import mongoose from 'mongoose';

async function connectDB(url){
    mongoose.set('strictQuery', true); //enforce strict filtering in queries
    await mongoose.connect(url);
    console.log('MongoDB connected');
}

export default connectDB;
