import { TURN } from '@constant/channels';
import { Status } from '@constant/status';
import { Chess } from '@models/chess.modal';
import { KafkaConsumerProps } from 'types/kafka.types';

const kafkaInMatch = async ({ message }: KafkaConsumerProps) => {
    const { to, turn, value } = JSON.parse(message);
    const { move, state } = value;

    const values = await Chess.findOneAndUpdate(
        { _id: to, status: Status.PLAYING },
        {
            $push: { movement: { turn, move, state } },
            currentTurn: turn === TURN.BLACK ? TURN.WHITE : TURN.BLACK,
        },
        { new: true, runValidators: true }
    )
        .exec()
        .catch(console.error);
};
export default kafkaInMatch;
