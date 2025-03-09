export interface KafkaConsumerProps {
    message: string;
    pause: () => () => void;
    topic: string;
    partition: number;
    commit: () => void;
}
export interface KafkaBatchConsumerProps {
    batch: { messages: { value: string }[] };
}
