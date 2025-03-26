import { MatchChannels } from 'constant/channels';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketDisconnect = async (socketId: string) => {
    try {
        console.log('user disconnected ', { socketId });
        kafkProducer(MatchChannels.DISCONNECT)(JSON.stringify({ socketId }));
    } catch (error) {
        console.log(error);
    }
};

export default socketDisconnect;
