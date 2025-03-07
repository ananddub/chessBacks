import { Kafka } from 'kafkajs';
import { Config } from '../config/config';

export const kafkaClient = (() => {
    const kafka = new Kafka({
        clientId: 'chess',
        brokers: [Config.KAFKA_URI],
    });

    return () => kafka;
})();
