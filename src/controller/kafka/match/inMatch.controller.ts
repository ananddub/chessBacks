import { TURN } from '@constant/channels';
import { Chess } from '@models/chess.modal';
import { KafkaConsumerProps } from 'types/kafka.types';

const kafkaInMatch = async ({ message }: KafkaConsumerProps) => {
    const { groupId, turn, moves, state } = JSON.parse(message);
    Chess.findByIdAndUpdate(
        groupId,

        {
            $push: { movement: { turn, moves, state } },
            currentTurn: turn === TURN.BLACK ? TURN.WHITE : TURN.BLACK,
        },
        { new: true, runValidators: true }
    )
        .exec()
        .catch(console.error);
};
export default kafkaInMatch;
