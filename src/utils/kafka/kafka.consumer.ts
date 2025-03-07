import { kafkaClient } from '@db/kafak.cl';
import { Channels } from 'constant/channels';

import { KafkaConsumerProps } from 'types/kafka.types';

type Callback = (props: KafkaConsumerProps) => void;
export default async function kafkaConsumer(topic: Channels, callback: Callback) {
    const kafka = kafkaClient();
    const consumer = kafka.consumer({ groupId: topic, allowAutoTopicCreation: true });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause, topic, partition }) => {
            async function commit() {
                await consumer.commitOffsets([{ topic, partition, offset: message.value.toString() }]);
            }
            callback({ message: message.value.toString(), pause, topic, partition, commit });
        },
    });
}
