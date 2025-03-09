import { Channels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';

const redisDisconnect = async (msg: string) => {
    try {
        const io = await initSocket();
        const { user } = JSON.parse(msg);
        io.emit(Channels.RON_DISCONNECT, { user });
    } catch (error) {
        console.log(error);
    }
};

export default redisDisconnect;
