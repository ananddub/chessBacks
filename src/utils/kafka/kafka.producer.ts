import { UserChallenge, UserChannels } from '@constant/userchannel';
import { kafkaClient } from '@db/kafak.cl';
import { MatchChannels } from 'constant/channels';

export default function kafkProducer(topic: MatchChannels | UserChannels | UserChallenge) {
    const kafka = kafkaClient();
    const newtopic = topic.toString().replace(/:/g, '_');
    const producer = kafka.producer();
    return async (message: any) => {
        try {
            await producer.connect();
            await producer.send({
                topic: newtopic,
                messages: [{ value: message }],
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
}
