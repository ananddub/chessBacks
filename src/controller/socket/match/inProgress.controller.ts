import { MatchChannels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketInProgress = async (msg: string) => {
    try {
        console.log({ channels: MatchChannels.PROGRESS, msg });

        kafkProducer(MatchChannels.PROGRESS)(msg);
        redisPublish(MatchChannels.PROGRESS, msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketInProgress;
