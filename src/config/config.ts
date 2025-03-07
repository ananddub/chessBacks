import dotenv from 'dotenv';
dotenv.config();

export const Config = {
    REDIS_URI: process.env.REDIS_URI || '',
    MONGODB_URI: process.env.DATABASE_URI || '',
    KAFKA_URI: process.env.KAFKA_URI || '',
    PORT: process.env.PORT || 4000,
};
