import kafkProducer from '@utils/kafka/kafka.producer';
import { Channels } from 'constant/channels';
import { initSocket } from 'lib/socket.manager';

const redisOnLeave = async (msg: string) => {
    try {
        const io = await initSocket();
        const { value, user, to } = JSON.parse(msg);
        const send_players = `${Channels.ON_MATCH}_${to}_players`;
        const send_watching = `${Channels.ON_MATCH}_${to}_watching`;
        io.to(send_players).emit(Channels.ON_MESSAGE, { value, user });
        io.to(send_watching).emit(Channels.ON_MESSAGE, { value, user });
    } catch (error) {
        console.log(error);
    }
};

export default redisOnLeave;
