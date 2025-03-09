import dotenv from 'dotenv';
dotenv.config();

export const Config = {
    REDIS_URI: process.env.REDIS_URI || '',
    MONGODB_URI: process.env.DATABASE_URI || '',
    KAFKA_URI: process.env.KAFKA_URI || '',
    PORT: process.env.PORT || 4000,
    MEILISEARCH_URL: process.env.MEILISEARCH_URL || '',
    MEILISEARCH_MASTER_KEY: process.env.MEILISEARCH_MASTER_KEY || '',
    REDIS: process.env.REDIS || '',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
};
