import { KafkaConsumerProps } from 'types/kafka.types';

const kafkaEndMatch = ({ message }: KafkaConsumerProps) => {
    console.log(message);
};

export default kafkaEndMatch;
