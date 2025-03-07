import { Channels } from '@constant/channels';
import { Chess } from '@models/chess.modal';
import { KafkaConsumerProps } from 'types/kafka.types';

const KafkaMessage = async ({ message }: KafkaConsumerProps) => {
    const { value, user, to } = JSON.parse(message);
    await Chess.findByIdAndUpdate(to, { $push: { message: { user, value } } });
};

export default KafkaMessage;
