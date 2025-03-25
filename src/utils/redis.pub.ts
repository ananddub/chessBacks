import { UserChannels } from '@constant/userchannel';
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

const redisPublish = async (channel: MatchChannels | UserChannels, message: string) => {
    const io = await initSocket();
    // redisPub().publish(channel, message);
    const channels = KafkaEnum.socketName + channel;
    obj.get(channels)(message);
    // io.emit(KafkaEnum.socketName + channel, message)
};

export default redisPublish;

const obj = new Map([
    [KafkaEnum.socketName + MatchChannels.ON_MATCH, redisInMatch],
    [KafkaEnum.socketName + MatchChannels.ON_MESSAGE, redisMessage],
    [KafkaEnum.socketName + MatchChannels.ON_REQUEST_JOIN, redisRequestJoin],
    [KafkaEnum.socketName + MatchChannels.ON_ACCEPT_JOIN, redisAcceptJoin],
    [KafkaEnum.socketName + MatchChannels.ON_REJECT_JOIN, redisRejectJoin],
    [KafkaEnum.socketName + MatchChannels.ON_END_MATCH, redisEndMatch],
    [KafkaEnum.socketName + MatchChannels.ON_PROGRESS, redisInProgress],
    [KafkaEnum.socketName + MatchChannels.ON_CONNECT, redisConnect],
    [KafkaEnum.socketName + MatchChannels.RON_DISCONNECT, redisDisconnect],
    [KafkaEnum.socketName + MatchChannels.ON_WATCH, redisWatching],
    [KafkaEnum.socketName + MatchChannels.ON_LEAVE, redisOnLeave],
]);
