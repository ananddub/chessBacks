import { SendEnum } from '@constant/sendEnum';
import sendUser from '@utils/send.user';
import { MatchChannels } from 'constant/channels';
import { initSocket } from 'lib/socket.manager';

const redisOnLeave = async (msg: string) => {
    try {
        const io = await initSocket();
        const { id, winner } = JSON.parse(msg) as { id: string; winner: any };
        console.log('leave from socket->', id, winner);
        const send_leave = sendUser(MatchChannels.MATCH, id, SendEnum.LEAVE);
        io.emit(send_leave, { id, winner });
    } catch (error) {
        console.log(error);
    }
};

export default redisOnLeave;
