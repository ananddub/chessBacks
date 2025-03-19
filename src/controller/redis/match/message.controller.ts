import { SendEnum } from '@constant/sendEnum';
import { Channels } from 'constant/channels';
import { initSocket } from 'lib/socket.manager';

const redisMessage = async (msg: string) => {
    try {
        const io = await initSocket();
        const { value, user, to } = JSON.parse(msg);
        const send_players = `${Channels.ON_MATCH}_${to}_${SendEnum.MESSAGE}`;
        io.emit(send_players, { value, user });
    } catch (error) {
        console.log(error);
    }
};

export default redisMessage;
