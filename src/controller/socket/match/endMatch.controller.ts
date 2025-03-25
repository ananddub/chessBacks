import { MatchChannels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketEndMatch = async (msg: string) => {
    try {
        kafkProducer(MatchChannels.ON_END_MATCH)(msg);
        await redisPublish(MatchChannels.ON_END_MATCH, msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketEndMatch;
