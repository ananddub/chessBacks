import { MatchChannels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketInProgress = async (msg: string) => {
    try {
        kafkProducer(MatchChannels.ON_PROGRESS)(msg);
        redisPublish(MatchChannels.ON_PROGRESS, msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketInProgress;
