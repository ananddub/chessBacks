import { UserChannels } from '@constant/userchannel';
import { kafkaClient } from '@db/kafak.cl';
import { Channels } from 'constant/channels';

export default function kafkProducer(topic: Channels | UserChannels) {
    const kafka = kafkaClient();
    const producer = kafka.producer();
    return async (message: any) => {
        try {
            await producer.connect();
            await producer.send({
                topic,
                messages: [{ value: message }],
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
}
