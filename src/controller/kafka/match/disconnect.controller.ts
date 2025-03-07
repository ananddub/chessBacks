import { KafkaConsumerProps } from 'types/kafka.types';
import { IUser, User } from '@models/user.modal';
import { Status } from 'constant/status';
import redisPublish from '@utils/redis.pub';
import { Channels } from 'constant/channels';

const kafkaDisconnect = async ({ message, commit }: KafkaConsumerProps) => {
    try {
        const id = message as string;
        const user = await User.findOneAndUpdate(
            {
                socketId: id,
            },
            {
                socketId: null,
                isOnline: false,
                status: Status.LOBBY,
            },
            {
                new: true,
            }
        );

        redisPublish(Channels.RON_DISCONNECT, JSON.stringify({ user }));
        console.log('Disconnected user: ', user);
    } catch (error) {
        console.log(error);
    }
};

export default kafkaDisconnect;
