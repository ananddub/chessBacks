import { Channels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketMessage = async (msg: string) => {
    try {
        kafkProducer(Channels.ON_MESSAGE)(msg);
        redisPublish(Channels.ON_MESSAGE, msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketMessage;
