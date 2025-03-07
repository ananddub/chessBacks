import { Channels } from 'constant/channels';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketConnect = async (msg: string) => {
    try {
        kafkProducer(Channels.ON_CONNECT)(msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketConnect;
