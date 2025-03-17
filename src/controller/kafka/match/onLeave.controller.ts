import { Channels, TURN } from '@constant/channels';
import { MATCH, Status } from '@constant/status';
import { Chess } from '@models/chess.modal';
import { User } from '@models/user.modal';
import redisPublish from '@utils/redis.pub';
import mongoose from 'mongoose';
import { KafkaConsumerProps } from 'types/kafka.types';

const KafkaOnLeave = async ({ message }: KafkaConsumerProps) => {
    try {
        const { id } = JSON.parse(message);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('Invalid ID format', { id });
            return;
        }

        const chess = await Chess.findOne({
            $or: [
                { 'player1.user': id, status: Status.PLAYING },
                { 'player2.user': id, status: Status.PLAYING },
            ],
        })
            .populate<{ player1: { user: any; turn: TURN } }>('player1.user')
            .populate<{ player2: { user: any; turn: TURN } }>('player2.user')
            .populate('winner.user')
            .lean();

        if (!chess) {
            console.log('Game not found', { id });
            return;
        }

        console.log('User leaving:', id);
        let winner;
        if (chess.player1.user._id.toString() === id) {
            winner = {
                status: Status.FINISHED,
                winner: {
                    user: chess.player2.user._id as any,
                    type: MATCH.ABANDONED,
                    turn: chess.player2.turn,
                    createdAt: new Date().getTime(),
                },
            };

            await User.findByIdAndUpdate(chess.player2.user._id, { status: Status.LOBBY });
        } else if (chess.player2.user._id.toString() === id) {
            winner = {
                status: Status.FINISHED,
                winner: {
                    user: chess.player1.user._id as any,
                    type: MATCH.ABANDONED,
                    turn: chess.player1.turn,
                    createdAt: new Date().getTime(),
                },
            };
            await User.findByIdAndUpdate(chess.player1.user._id, { status: Status.LOBBY });
        } else {
            console.log('User not in match', { id, ...chess });
            return;
        }
        await Chess.findByIdAndUpdate(chess._id, winner);
        const value = {
            id: chess._id,
            winner: winner.winner,
        };
        console.log('Kafka: Emitting end match', value);
        redisPublish(Channels.ON_LEAVE, JSON.stringify(value));
    } catch (error) {
        console.log('Kafka: Error in onLeave', error);
    }
};

export default KafkaOnLeave;
