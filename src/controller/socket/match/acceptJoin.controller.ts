import { Channels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';

const socketAcceptJoin = async (msg: string) => {
    try {
        kafkProducer(Channels.ON_ACCEPT_JOIN)(msg);
        await redisPublish(Channels.ON_ACCEPT_JOIN, msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketAcceptJoin;
