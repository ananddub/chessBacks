import { Channels } from 'constant/channels';
import kafkProducer from '@utils/kafka/kafka.producer';
import { initSocket } from 'lib/socket.manager';

const socketConnect = async (msg: string) => {
    try {
        kafkProducer(Channels.ON_CONNECT)(msg);
        const io = await initSocket();
        const user = JSON.parse(msg);
        io.emit(Channels.ON_CONNECT, user);
    } catch (error) {
        console.log(error);
    }
};

export default socketConnect;
