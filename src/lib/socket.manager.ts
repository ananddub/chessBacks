import { Config } from '@config/config';
import { Redis } from 'ioredis';
import { Server, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';

let io: Server | null = null;

export const initSocket = async (server: any = null): Promise<Server> => {
    if (io) return io;
    if (!server) {
        console.log('Server value is needed ', server);
        throw 'Server value is needed';
    }
    const pubClient = new Redis(Config.REDIS as any, Config.REDIS_PORT as string);
    const subClient = pubClient.duplicate();
    pubClient.on('connect', () => {
        console.log('Redis Pub Client Connected');
    });

    pubClient.on('error', (err) => {
        console.log('Redis Pub Client Error:', err);
    });

    subClient.on('error', (err) => {
        console.log('Redis Sub Client Error:', err);
    });

    io = new Server(server, {
        adapter: createAdapter(pubClient, subClient),
        cors: {
            origin: '*',
            methods: ['*'],
            allowedHeaders: ['*'],
        },
    });
    return io;
};
