import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';
import { UserChannels } from '@constant/userchannel';
import freindAcceptChallenge from './freindAcceptCh.controller';

const freindChallenge = async (msg: string) => {
    try {
        kafkProducer(UserChannels.ON_USER_CHALLENGE)(msg);
        redisPublish(UserChannels.ON_USER_CHALLENGE, msg);
    } catch (error) {
        console.log(error);
    }
};

export default freindChallenge;
