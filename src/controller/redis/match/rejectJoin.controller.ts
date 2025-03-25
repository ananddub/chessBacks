import { MatchChannels } from 'constant/channels';
import { initSocket } from 'lib/socket.manager';

const redisRejectJoin = async (msg: string) => {
    try {
        const io = await initSocket();
        const { user } = JSON.parse(msg) as { user: any };
        io.to(user.socketID).emit(MatchChannels.REJECT, { user });
    } catch (error) {
        console.log(error);
    }
};

export default redisRejectJoin;
