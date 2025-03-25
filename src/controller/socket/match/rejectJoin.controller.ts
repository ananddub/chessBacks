import { MatchChannels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketRejectJoin = async (msg: string) => {
    try {
        kafkProducer(MatchChannels.ON_REJECT_JOIN)(msg);
        redisPublish(MatchChannels.ON_REJECT_JOIN, msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketRejectJoin;
