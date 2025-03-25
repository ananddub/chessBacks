import { MatchChannels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';

const redisDisconnect = async (msg: string) => {
    try {
        const io = await initSocket();
        const { user } = JSON.parse(msg) as { user: any };
        io.emit(MatchChannels.DISCONNECT, { user });
    } catch (error) {
        console.log(error);
    }
};

export default redisDisconnect;
