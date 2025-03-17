import { KafkaConsumerProps } from 'types/kafka.types';
import { Chess } from '@models/chess.modal';
import { Status } from 'constant/status';
import { User } from '@models/user.modal';
import redisPublish from '@utils/redis.pub';
import { Channels, TURN } from 'constant/channels';

const kafkaCustomChallenge = async ({ message, commit }: KafkaConsumerProps) => {
    const { player1, player2, isPrivate, password } = JSON.parse(message);
    const user = await User.findById(player1);
    const newuser = await User.findById(player2);
    if (!user || !newuser || user._id === newuser._id) {
        return;
    }
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
};

export default kafkaCustomChallenge;
