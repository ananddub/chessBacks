import { MatchChannels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketMessage = async (msg: string) => {
    try {
        kafkProducer(MatchChannels.ON_MESSAGE)(msg);
        redisPublish(MatchChannels.ON_MESSAGE, msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketMessage;
