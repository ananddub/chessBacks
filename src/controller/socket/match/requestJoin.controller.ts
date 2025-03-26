import { MatchChannels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketRequestJoin = async (msg: string) => {
    try {
        kafkProducer(MatchChannels.REQUEST)(msg);
        redisPublish(MatchChannels.REQUEST, msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketRequestJoin;
