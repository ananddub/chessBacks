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

    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['*'],
            allowedHeaders: ['*'],
        },
    });
    return io;
};
