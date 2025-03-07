import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';
import { UserChannels } from '@constant/userchannel';

const freindAcceptChallenge = async (msg: string) => {
    try {
        kafkProducer(UserChannels.ON_USER_ACCEPT_CHALLENGE)(msg);
        redisPublish(UserChannels.ON_USER_ACCEPT_CHALLENGE, msg);
    } catch (error) {
        console.log(error);
    }
};

export default freindAcceptChallenge;
