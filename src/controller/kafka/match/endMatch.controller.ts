import { Status } from '@constant/status';
import { Chess } from '@models/chess.modal';
import { User } from '@models/user.modal';
import { KafkaConsumerProps } from 'types/kafka.types';

const kafkaEndMatch = async ({ message }: KafkaConsumerProps) => {
    const { id, winner } = JSON.parse(message);
    await Chess.findByIdAndUpdate(id, { status: Status.FINISHED, winner });
    const chess = await Chess.findById(id)
        .populate<{ player1: { user: any } }>('player1.user')
        .populate<{ player2: { user: any } }>('player2.user');
    if (!chess) return;
    await User.findByIdAndUpdate(chess.player1.user._id, { status: Status.LOBBY });
    await User.findByIdAndUpdate(chess.player2.user._id, { status: Status.LOBBY });
};

export default kafkaEndMatch;
