import { User } from '@models/user.modal';
import { Channels } from 'constant/channels';

import redisPublish from '@utils/redis.pub';
import { ConfigSource } from 'kafkajs';
import { Status } from 'constant/status';
import { KafkaConsumerProps } from 'types/kafka.types';
import { redisPub } from '@db/redis.db';

const kafkaConnect = async ({ message, pause, commit }: KafkaConsumerProps) => {
    try {
        const { id, socketId } = JSON.parse(message) as { id: any; socketId: string };
        const user = await User.findByIdAndUpdate(
            id,
            { socketId, isOnline: true, status: Status.LOBBY },
            { new: true, lean: true }
        );

        redisPub().set('user:' + id, JSON.stringify(user));
        redisPublish(Channels.ON_CONNECT, JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
};

export default kafkaConnect;
