import { UserChallenge, UserChannels } from '@constant/userchannel';
import { redisPub } from '@db/redis.db';
import { MatchChannels, KafkaEnum } from 'constant/channels';
import { initSocket } from 'lib/socket.manager';
import redisInMatch from 'controller/redis/match/InMatch.controller';
import redisMessage from 'controller/redis/match/message.controller';
import redisRequestJoin from 'controller/redis/match/requestJoin.controller';
import redisAcceptJoin from 'controller/redis/match/acceptJoin.controller';
import redisRejectJoin from 'controller/redis/match/rejectJoin.controller';
import redisEndMatch from 'controller/redis/match/endMatch.controller';
import redisInProgress from 'controller/redis/match/InProgress.controller';
import redisConnect from 'controller/redis/match/connect.controller';
import redisDisconnect from 'controller/redis/match/disconnect.controller';
import redisWatching from 'controller/redis/match/watching.controller';
import redisOnLeave from 'controller/redis/match/onLeave.controller';

const redisPublish = async (channel: MatchChannels | UserChannels | UserChallenge, message: string) => {
    const io = await initSocket();
    // redisPub().publish(channel, message);
    const channels = KafkaEnum.socketName + channel;
    if (obj.has(channels)) {
        obj.get(channels)(message);
    }
    // io.emit(KafkaEnum.socketName + channel, message)
};

export default redisPublish;

const obj = new Map([
    [KafkaEnum.socketName + MatchChannels.MATCH, redisInMatch],
    [KafkaEnum.socketName + MatchChannels.MESSAGE, redisMessage],
    [KafkaEnum.socketName + MatchChannels.REQUEST, redisRequestJoin],
    [KafkaEnum.socketName + MatchChannels.ACCEPT, redisAcceptJoin],
    [KafkaEnum.socketName + MatchChannels.REJECT, redisRejectJoin],
    [KafkaEnum.socketName + MatchChannels.END, redisEndMatch],
    [KafkaEnum.socketName + MatchChannels.PROGRESS, redisInProgress],
    [KafkaEnum.socketName + MatchChannels.CONNECT, redisConnect],
    [KafkaEnum.socketName + MatchChannels.DISCONNECT, redisDisconnect],
    [KafkaEnum.socketName + MatchChannels.WATCH, redisWatching],
    [KafkaEnum.socketName + MatchChannels.LEAVE, redisOnLeave],
]);
