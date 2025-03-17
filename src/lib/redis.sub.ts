import { redisSub } from '@db/redis.db';
import { Channels } from 'constant/channels';
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

export const redisLisner = () => {
    // redisSub().subscribe(Channels.ON_MATCH, redisInMatch);
    // redisSub().subscribe(Channels.ON_MESSAGE, redisMessage);
    // redisSub().subscribe(Channels.ON_REQUEST_JOIN, redisRequestJoin);
    // redisSub().subscribe(Channels.ON_ACCEPT_JOIN, redisAcceptJoin);
    // redisSub().subscribe(Channels.ON_REJECT_JOIN, redisRejectJoin);
    // redisSub().subscribe(Channels.ON_END_MATCH, redisEndMatch);
    // redisSub().subscribe(Channels.ON_PROGRESS, redisInProgress);
    // redisSub().subscribe(Channels.ON_CONNECT, redisConnect);
    // redisSub().subscribe(Channels.RON_DISCONNECT, redisDisconnect);
    // redisSub().subscribe(Channels.ON_WATCH, redisWatching);
    // redisSub().subscribe(Channels.ON_LEAVE, redisOnLeave);
};
