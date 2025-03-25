import { MatchChannels } from 'constant/channels';
import kafkProducer from '@utils/kafka/kafka.producer';
import { initSocket } from 'lib/socket.manager';

const socketConnect = async (msg: string) => {
    try {
        kafkProducer(MatchChannels.ON_CONNECT)(msg);
        const io = await initSocket();
        const user = JSON.parse(msg);
        io.emit(MatchChannels.ON_CONNECT, user);
    } catch (error) {
        console.log(error);
    }
};

export default socketConnect;
