import { MatchChannels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';

const redisStatusUpdate = async (msg: string) => {
    try {
        const io = await initSocket();
        const { user } = JSON.parse(msg);
        io.emit(MatchChannels.ON_USER_STATUS, { user });
    } catch (error) {
        console.log(error);
    }
};

export default redisStatusUpdate;
