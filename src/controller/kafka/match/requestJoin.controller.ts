import { Channels } from '@constant/channels';
import { Chess } from '@models/chess.modal';
import { User } from '@models/user.modal';
import redisPublish from '@utils/redis.pub';
import { KafkaConsumerProps } from 'types/kafka.types';

const kafkaRequestJoin = async ({ message }: KafkaConsumerProps) => {
    const { groupId, id } = JSON.parse(message);
    const chess = await Chess.findByIdAndUpdate(groupId, { $push: { requested: id } });
    const user = await User.findById(id);
    if (!chess || !user) return;
    await redisPublish(Channels.ON_REQUEST_JOIN, JSON.stringify({ groupId, user }));
    console.log(message);
};

export default kafkaRequestJoin;
