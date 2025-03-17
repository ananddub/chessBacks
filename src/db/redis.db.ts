import { createClient } from 'redis';
import { Config } from '../config/config';

export const redisSub = (() => {
    const client = createClient({
        url: Config.REDIS_URI,
    });
    client.connect();
    client.on('connect', () => {
        console.log('Redis Subscribe Client Connected');
    });
    client.on('error', (err: any) => {
        console.log('Redis Subscribe Client Error', err);
    });
    return () => client;
})();

export const redisPub = (() => {
    return () => redisSub();
})();
