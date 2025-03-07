import { createClient } from 'redis';
import { Config } from '../config/config';

export const redisSub = (() => {
    const client = createClient(Config.REDIS_URI as any);
    client.connect();
    client.on('error', (err: any) => {
        console.log('Redis Subscribe Client Error', err);
    });
    return () => client;
})();

export const redisPub = (() => {
    const client = createClient(Config.REDIS_URI as any);
    client.connect();
    client.on('error', (err: any) => {
        console.log('Redis Publish Client Error', err);
    });

    return () => client;
})();
