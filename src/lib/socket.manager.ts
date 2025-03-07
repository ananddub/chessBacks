import { Server, Socket } from 'socket.io';
let io: Server | null = null;

export const initSocket = (server: any = null): Server => {
    if (io) return io;
    if (!server) {
        console.log('Server value is needed ', server);
        throw 'Server value is needed';
    }
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['my-custom-header'],
        },
    });

    return io;
};
