import { Channels } from 'constant/channels';
import { initSocket } from 'lib/socket.manager';

const redisWatching = async (msg: string) => {
    try {
        const io = initSocket();
        const { groupId, length } = JSON.parse(msg);
        const send_channel = `${Channels.ON_WATCH}_${groupId}`;
        io.emit(send_channel, { groupId, length });
    } catch (error) {
        console.log(error);
    }
};

export default redisWatching;
