import { Channels } from 'constant/channels';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketDisconnect = async (socketId: string) => {
    try {
        console.log('user disconnected ', { socketId });
        kafkProducer(Channels.ON_DISCONNECT)(JSON.stringify({ socketId }));
    } catch (error) {
        console.log(error);
    }
};

export default socketDisconnect;
