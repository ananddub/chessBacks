import { SendEnum } from '@constant/sendEnum';
import { Channels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';
import { MsgValue } from 'types/redis.types';

const redisEndMatch = async (msg: string) => {
    try {
        const io = await initSocket();
        const { id, winner } = JSON.parse(msg) as { id: string; winner: any };
        const send_watching = `${Channels.ON_MATCH}_${id}_${SendEnum.RESULT}`;
        io.emit(send_watching, { id, winner });
    } catch (error) {
        console.log(error);
    }
};

export default redisEndMatch;
