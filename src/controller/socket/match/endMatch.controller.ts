import { Channels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketEndMatch = async (msg: string) => {
    try {
        kafkProducer(Channels.ON_END_MATCH)(msg);
        await redisPublish(Channels.ON_END_MATCH, msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketEndMatch;
