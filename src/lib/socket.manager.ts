import { Config } from '@config/config';
import { Redis } from 'ioredis';
import { Server, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-streams-adapter';
import { instrument } from '@socket.io/admin-ui';

let io: Server | null = null;

export const initSocket = async (server: any = null): Promise<Server> => {
    if (io) return io;
    if (!server) {
        console.log('Server value is needed ', server);
        throw 'Server value is needed';
    }

    const subClient = new Redis(Config.REDIS_HOST as any, Config.REDIS_PORT as string);
    subClient.on('connect', () => {
        console.log('Redis Pub Client Connected');
    });

    io = new Server(server, {
        adapter: createAdapter(subClient),
        cors: {
            origin: '*',
            credentials: true,
        },
    });
    instrument(io, {
        auth: false,
        mode: 'development',
    });
    return io;
};
