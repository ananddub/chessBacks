import redisPublish from '@utils/redis.pub';
import kafkProducer from '@utils/kafka/kafka.producer';
import { UserChannels } from '@constant/userchannel';

const freindAccept = async (msg: string) => {
    try {
        kafkProducer(UserChannels.FREIND_ACCEPT)(msg);
        redisPublish(UserChannels.FREIND_ACCEPT, msg);
    } catch (error) {
        console.log(error);
    }
};

export default freindAccept;
