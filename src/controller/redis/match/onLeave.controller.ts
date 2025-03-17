import { SendEnum } from '@constant/sendEnum';
import { Channels } from 'constant/channels';
import { initSocket } from 'lib/socket.manager';

const redisOnLeave = async (msg: string) => {
    try {
        const io = await initSocket();
        const { id, winner } = JSON.parse(msg);
        console.log('leave from socket->', id, winner);

        const send_leave = `${Channels.ON_MATCH}_${id}_${SendEnum.LEAVE}`;
        io.emit(send_leave, { id, winner });
    } catch (error) {
        console.log(error);
    }
};

export default redisOnLeave;
