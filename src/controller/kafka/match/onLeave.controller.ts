import { Channels } from '@constant/channels';
import { Chess } from '@models/chess.modal';
import redisPublish from '@utils/redis.pub';
import { KafkaConsumerProps } from 'types/kafka.types';

const KafkaOnLeave = async ({ message }: KafkaConsumerProps) => {
    try {
        const { to, groupId } = JSON.parse(message);
        const chess = await Chess.findByIdAndUpdate(groupId, { $pull: { watching: to } });
        redisPublish(Channels.ON_WATCH, JSON.stringify({ groupId, length: chess?.watching.length }));
        console.log(message);
    } catch (error) {
        console.log(error);
    }
};

export default KafkaOnLeave;
