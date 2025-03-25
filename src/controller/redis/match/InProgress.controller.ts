import { MatchChannels } from 'constant/channels';
import { initSocket } from 'lib/socket.manager';

const redisInProgress = async (msg: string) => {
    try {
        const io = await initSocket();
        const { value, to, from } = JSON.parse(msg) as { value: any; to: string; from: string };
        console.log('redis in progress', { value, to, from });
        io.to(to).emit(MatchChannels.PROGRESS, { value, to, from });
        io.to(from).emit(MatchChannels.PROGRESS, { value, to, from });
    } catch (error) {
        console.log(error);
    }
};

export default redisInProgress;
