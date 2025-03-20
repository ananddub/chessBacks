import { Channels, KafkaEnum } from 'constant/channels';
import socketMessage from 'controller/socket/match/message.controller';
import socketRequestJoin from 'controller/socket/match/requestJoin.controller';
import socketAcceptJoin from 'controller/socket/match/acceptJoin.controller';
import socketRejectJoin from 'controller/socket/match/rejectJoin.controller';
import socketEndMatch from 'controller/socket/match/endMatch.controller';
import socketInProgress from 'controller/socket/match/inProgress.controller';
import socketInMatch from 'controller/socket/match/inMatch.controller';
import { Server, Socket } from 'socket.io';
import socketConnect from 'controller/socket/match/connect.controller';
import socketDisconnect from 'controller/socket/match/disconnect.controller';
import socketOnLeave from 'controller/socket/match/onLeave.controller';
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
import redisStatusUpdate from 'controller/redis/user/statusupdate.controller';

export const socketLisnter = (io: Server) => {
    io.on('connection', (socket) => {
        //match
        console.log('Socket connected', socket.id);
        socket.on(Channels.ON_MESSAGE, socketMessage);
        socket.on(Channels.ON_REQUEST_JOIN, socketRequestJoin);
        socket.on(Channels.ON_ACCEPT_JOIN, socketAcceptJoin);
        socket.on(Channels.ON_REJECT_JOIN, socketRejectJoin);
        socket.on(Channels.ON_END_MATCH, socketEndMatch);
        socket.on(Channels.ON_PROGRESS, socketInProgress);
        socket.on(Channels.ON_MATCH, socketInMatch);
        socket.on(Channels.ON_CONNECT, socketConnect);
        socket.on(Channels.ON_LEAVE, socketOnLeave);
        socket.on(Channels.ON_DISCONNECT, (msg: string) => socketDisconnect(socket.id));
        kafkaSocket(socket);
        //user
    });
};

const kafkaSocket = (io: Socket<any>) => {
    io.on(KafkaEnum.socketName + Channels.ON_MATCH, redisInMatch);
    io.on(KafkaEnum.socketName + Channels.ON_MESSAGE, redisMessage);
    io.on(KafkaEnum.socketName + Channels.ON_REQUEST_JOIN, redisRequestJoin);
    io.on(KafkaEnum.socketName + Channels.ON_ACCEPT_JOIN, redisAcceptJoin);
    io.on(KafkaEnum.socketName + Channels.ON_REJECT_JOIN, redisRejectJoin);
    io.on(KafkaEnum.socketName + Channels.ON_END_MATCH, redisEndMatch);
    io.on(KafkaEnum.socketName + Channels.ON_PROGRESS, redisInProgress);
    io.on(KafkaEnum.socketName + Channels.ON_CONNECT, redisConnect);
    io.on(KafkaEnum.socketName + Channels.RON_DISCONNECT, redisDisconnect);
    io.on(KafkaEnum.socketName + Channels.ON_WATCH, redisWatching);
    io.on(KafkaEnum.socketName + Channels.ON_LEAVE, redisOnLeave);
    io.on(KafkaEnum.socketName + Channels.ON_USER_STATUS, redisStatusUpdate);
};
