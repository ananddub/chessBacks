import { MatchChannels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';

const redisConnect = async (msg: string) => {
    try {
        const io = await initSocket();
        const user = JSON.parse(msg);
        io.emit(MatchChannels.CONNECT, user);
    } catch (error) {
        console.log(error);
    }
};

export default redisConnect;
