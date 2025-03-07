import mongoose from 'mongoose';
import { Config } from '../config/config';

const connectDB = async () => {
    try {
        await mongoose.connect(Config.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
