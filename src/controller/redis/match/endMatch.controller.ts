import { Channels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';
import { MsgValue } from 'types/redis.types';

const redisEndMatch = async (msg: string) => {
    try {
        const io = initSocket();
        const { value, to, from } = JSON.parse(msg) as MsgValue;
        io.to(to).emit(Channels.ON_END_MATCH, { value, to, from });
    } catch (error) {
        console.log(error);
    }
};

export default redisEndMatch;
