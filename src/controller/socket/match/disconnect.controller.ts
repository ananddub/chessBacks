import { Channels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';
import { Socket } from 'socket.io';

const socketDisconnect = async (socketId: string) => {
    try {
        kafkProducer(Channels.ON_DISCONNECT)(socketId);
    } catch (error) {
        console.log(error);
    }
};

export default socketDisconnect;
