import { Channels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';
import { MsgValue } from 'types/redis.types';

const redisInProgress = async (msg: string) => {
    try {
        const io = await initSocket();
        const { value, to, from } = JSON.parse(msg) as MsgValue;

        io.to(to).emit(Channels.ON_PROGRESS, { value, to, from });
        io.to(from).emit(Channels.ON_PROGRESS, { value, to, from });
    } catch (error) {
        console.log(error);
    }
};

export default redisInProgress;
