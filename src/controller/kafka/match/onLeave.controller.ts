import { Channels, TURN } from '@constant/channels';
import { MATCH, Status } from '@constant/status';
import { Chess } from '@models/chess.modal';
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
                    type: MATCH.ABANDAND,
                    turn: chess.player2.turn,
                    createdAt: new Date().getTime(),
                },
            };
        } else if (chess.player2.user._id.toString() === id) {
            winner = {
                status: Status.FINISHED,
                winner: {
                    user: chess.player1.user._id as any,
                    type: MATCH.ABANDAND,
                    turn: chess.player1.turn,
                    createdAt: new Date().getTime(),
                },
            };
        } else {
            console.log('User not in match', { id, ...chess });
            return;
        }
        await Chess.findByIdAndUpdate(chess._id, winner);
        const value = {
            to: chess._id,
            user: chess.player1.user,
            value: {
                winner: winner.winner,
            },
        };
        console.log('Kafka: Emitting end match', value);
        redisPublish(Channels.ON_END_MATCH, JSON.stringify(value));
    } catch (error) {
        console.log('Kafka: Error in onLeave', error);
    }
};

export default KafkaOnLeave;
