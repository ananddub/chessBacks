import { MatchChannels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketEndMatch = async (msg: string) => {
    try {
        kafkProducer(MatchChannels.END)(msg);
        await redisPublish(MatchChannels.END, msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketEndMatch;
