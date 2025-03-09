import { Status } from '@constant/status';
import { Chess } from '@models/chess.modal';
import { KafkaConsumerProps } from 'types/kafka.types';

const kafkaEndMatch = async ({ message }: KafkaConsumerProps) => {
    const { id, winner } = JSON.parse(message);
    await Chess.findByIdAndUpdate(id, { status: Status.FINISHED, winner });
};

export default kafkaEndMatch;
