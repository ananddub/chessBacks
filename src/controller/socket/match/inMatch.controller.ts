import { MatchChannels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketInMatch = async (msg: string) => {
    try {
        redisPublish(MatchChannels.ON_MATCH, msg);
        kafkProducer(MatchChannels.ON_MATCH)(msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketInMatch;
