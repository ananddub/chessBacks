import { SendEnum } from '@constant/sendEnum';
import sendUser from '@utils/send.user';
import { MatchChannels } from 'constant/channels';
import { initSocket } from 'lib/socket.manager';

const redisMessage = async (msg: string) => {
    try {
        const io = await initSocket();
        const { value, user, to } = JSON.parse(msg) as { value: any; user: any; to: string };
        const send_players = sendUser(MatchChannels.MATCH, to, SendEnum.MESSAGE);
        io.emit(send_players, { value, user });
    } catch (error) {
        console.log(error);
    }
};

export default redisMessage;
