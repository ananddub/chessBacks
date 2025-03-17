import { KafkaConsumerProps } from 'types/kafka.types';
import { IUser, User } from '@models/user.modal';
import { Status } from 'constant/status';
import redisPublish from '@utils/redis.pub';
import { Channels } from 'constant/channels';
import kafkProducer from '@utils/kafka/kafka.producer';
import { redisPub } from '@db/redis.db';

const kafkaDisconnect = async ({ message, commit }: KafkaConsumerProps) => {
    try {
        const { socketId } = JSON.parse(message) as { socketId: string };
        console.log('Kafka: Disconnecting user', { socketId });
        const user = await User.findOneAndUpdate(
            {
                socketId,
            },
            {
                socketId: null,
                isOnline: false,
                status: Status.LOBBY,
            },
            {
                new: true,
            }
        ).lean();
        if (!user) {
            console.log('Kafka: Disconnect User not found', { socketId });
            return;
        }
        redisPub().del('user:' + user._id);
        redisPublish(Channels.RON_DISCONNECT, JSON.stringify({ user }));
        kafkProducer(Channels.ON_LEAVE)(JSON.stringify({ id: user._id }));
        console.log('Disconnected user: ', user);
    } catch (error) {
        console.log(error);
    }
};

export default kafkaDisconnect;
