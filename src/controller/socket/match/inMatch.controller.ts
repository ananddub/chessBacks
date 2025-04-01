import { MatchChannels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketInMatch = async (msg: string) => {
    try {
        console.log('inmatch socket', msg);
        redisPublish(MatchChannels.MATCH, msg);
        kafkProducer(MatchChannels.MATCH)(msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketInMatch;
