import { Channels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';
import { MsgValue } from 'types/redis.types';

const redisEndMatch = async (msg: string) => {
    try {
        const io = await initSocket();
        const { value, to } = JSON.parse(msg) as MsgValue;
        const send_players = `${Channels.ON_MATCH}_${to}_players`;
        const send_watching = `${Channels.ON_MATCH}_${to}_watching`;

        io.to(send_players).emit(Channels.ON_END_MATCH, { value, to });
        io.to(send_watching).emit(Channels.ON_END_MATCH, { value, to });
    } catch (error) {
        console.log(error);
    }
};

export default redisEndMatch;
