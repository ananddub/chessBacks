import { MatchChannels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketAcceptJoin = async (msg: string) => {
    try {
        kafkProducer(MatchChannels.ON_ACCEPT_JOIN)(msg);
        await redisPublish(MatchChannels.ON_ACCEPT_JOIN, msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketAcceptJoin;
