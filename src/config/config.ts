import dotenv from 'dotenv';
dotenv.config();

export const Config = {
    REDIS_URI: process.env.REDIS_URI || '',
    MONGODB_URI: process.env.DATABASE_URI || '',
    KAFKA_URI: process.env.KAFKA_URI || '',
    PORT: process.env.PORT || 4000,
    REDIS_HOST: process.env.REDIS_HOST || '',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
};

console.log(Config);
