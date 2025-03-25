import { SendEnum } from '@constant/sendEnum';
import sendUser from '@utils/send.user';
import { MatchChannels } from 'constant/channels';
import { initSocket } from 'lib/socket.manager';

const redisWatching = async (msg: string) => {
    try {
        const io = await initSocket();
        const { groupId, length } = JSON.parse(msg) as { groupId: string; length: number };
        const send_channel = sendUser(MatchChannels.WATCH, groupId, SendEnum.WATCHING);
        io.emit(send_channel, { groupId, length });
    } catch (error) {
        console.log(error);
    }
};

export default redisWatching;
