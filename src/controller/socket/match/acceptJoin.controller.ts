import { MatchChannels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketAcceptJoin = async (msg: string) => {
    try {
        kafkProducer(MatchChannels.ACCEPT)(msg);
        await redisPublish(MatchChannels.ACCEPT, msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketAcceptJoin;
