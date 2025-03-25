import { MatchChannels } from '@constant/channels';
import { Chess } from '@models/chess.modal';
import { User } from '@models/user.modal';
import redisPublish from '@utils/redis.pub';
import { KafkaConsumerProps } from 'types/kafka.types';

const kafkaAcceptJoin = async ({ message }: KafkaConsumerProps) => {
    const { groupId, id } = JSON.parse(message);
    const chess = await Chess.findByIdAndUpdate(groupId, { $pull: { accepted: id }, $push: { accepted: id } });
    const user = await User.findByIdAndUpdate(id);
    if (!chess || !user) return;
    await redisPublish(MatchChannels.ACCEPT, JSON.stringify({ groupId, user }));
    await redisPublish(MatchChannels.WATCH, JSON.stringify({ groupId, length: chess?.watching.length }));
    console.log(message);
};

export default kafkaAcceptJoin;
