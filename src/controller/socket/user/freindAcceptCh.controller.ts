import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';
import { MatchChannels } from '@constant/channels';

const freindAcceptChallenge = async (msg: string) => {
    try {
        kafkProducer(MatchChannels.CUSTOM)(msg);
        redisPublish(MatchChannels.CUSTOM, msg);
    } catch (error) {
        console.log(error);
    }
};

export default freindAcceptChallenge;
