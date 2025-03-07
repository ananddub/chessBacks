import { Channels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';

const redisConnect = async (msg: string) => {
    try {
        const io = initSocket();
        const user = JSON.parse(msg);
        io.emit(Channels.ON_CONNECT, user);
    } catch (error) {
        console.log(error);
    }
};

export default redisConnect;
