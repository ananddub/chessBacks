import { SendEnum } from '@constant/sendEnum';
import sendUser from '@utils/send.user';
import { MatchChannels } from 'constant/channels';
import { initSocket } from 'lib/socket.manager';

const redisEndMatch = async (msg: string) => {
    try {
        const io = await initSocket();
        const { id, winner } = JSON.parse(msg) as { id: string; winner: any };
        const send_watching = sendUser(MatchChannels.MATCH, id, SendEnum.RESULT);
        io.emit(send_watching, { id, winner });
    } catch (error) {
        console.log(error);
    }
};

export default redisEndMatch;
