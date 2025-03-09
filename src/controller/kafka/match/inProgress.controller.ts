import { KafkaConsumerProps } from 'types/kafka.types';
import { Chess } from '@models/chess.modal';
import { Status } from 'constant/status';
import { User } from '@models/user.modal';
import redisPublish from '@utils/redis.pub';
import { Channels, TURN } from 'constant/channels';

const kafkaInProgress = async ({ message, commit }: KafkaConsumerProps) => {
    const { player1, isPrivate, password } = JSON.parse(message);
    const user = await User.findById(player1);
    if (!user) {
        return;
    }
    user.status = Status.PENDING;
    const newuser = await User.findOne({
        status: Status.PENDING,
        _id: { $ne: player1 },
    });
    if (newuser) {
        user.status = Status.PLAYING;
        newuser.status = Status.PLAYING;
        await user.save();
        await newuser.save();
        const chess = new Chess({
            player1: {
                turn: TURN.WHITE,
                user: newuser._id,
            },
            player2: {
                turn: TURN.BLACK,
                user: user._id,
            },
            status: Status.PLAYING,
            isPrivate,
            password,
        });
        const chessdata = await chess.save();
        const mapvalue = await Chess.findById(chessdata._id).populate('player1.user').populate('player2.user');

        const value = {
            to: user.socketId,
            from: newuser.socketId,
            value: mapvalue,
        };
        redisPublish(Channels.ON_PROGRESS, JSON.stringify(value));
    } else {
        await user.save();
    }
};

export default kafkaInProgress;
