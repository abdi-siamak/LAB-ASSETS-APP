import mongoose from 'mongoose';

export async function connectDB(url){
    mongoose.set('strictQuery', true); //enforce strict filtering in queries
    await mongoose.connect(url);
    console.log('MongoDB connected');
}


export async function disconnectDB() {
  await mongoose.disconnect();
}
