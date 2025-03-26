import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';
import { UserChallenge } from '@constant/userchannel';

const freindChallenge = async (msg: string) => {
    try {
        kafkProducer(UserChallenge.CHALLENGE)(msg);
        redisPublish(UserChallenge.CHALLENGE, msg);
    } catch (error) {
        console.log(error);
    }
};

export default freindChallenge;
