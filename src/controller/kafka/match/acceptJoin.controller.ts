import { Channels } from '@constant/channels';
import { Chess } from '@models/chess.modal';
import { User } from '@models/user.modal';
import redisPublish from '@utils/redis.pub';
import { KafkaConsumerProps } from 'types/kafka.types';

const kafkaAcceptJoin = async ({ message }: KafkaConsumerProps) => {
    const { groupId, id } = JSON.parse(message);
    const chess = await Chess.findByIdAndUpdate(groupId, { $pull: { accepted: id }, $push: { accepted: id } });
    const user = await User.findByIdAndUpdate(id);
    if (!chess || !user) return;
    await redisPublish(Channels.ON_ACCEPT_JOIN, JSON.stringify({ groupId, user }));
    await redisPublish(Channels.ON_WATCH, JSON.stringify({ groupId, length: chess?.watching.length }));
    console.log(message);
};

export default kafkaAcceptJoin;
