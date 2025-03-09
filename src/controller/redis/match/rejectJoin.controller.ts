import { Channels } from 'constant/channels';
import { initSocket } from 'lib/socket.manager';

const redisRejectJoin = async (msg: string) => {
    try {
        const io = await initSocket();
        const { user } = JSON.parse(msg);
        io.to(user.socketID).emit(Channels.ON_REJECT_JOIN, { user });
    } catch (error) {
        console.log(error);
    }
};

export default redisRejectJoin;
