import { Channels } from '@constant/channels';
import { Chess } from '@models/chess.modal';
import { User } from '@models/user.modal';
import redisPublish from '@utils/redis.pub';
import { KafkaConsumerProps } from 'types/kafka.types';

const kafkaRejectJoin = async ({ message }: KafkaConsumerProps) => {
    const { groupId, id } = JSON.parse(message);
    const chess = await Chess.findByIdAndUpdate(groupId, { $pull: { requested: id }, $push: { rejected: id } });
    const user = await User.findByIdAndUpdate(id);
    if (!chess || !user) return;
    await redisPublish(Channels.ON_REJECT_JOIN, JSON.stringify({ user }));
    console.log(message);
};

export default kafkaRejectJoin;
