import { MatchChannels, KafkaEnum } from 'constant/channels';
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
        socket.on(MatchChannels.MESSAGE, socketMessage);
        socket.on(MatchChannels.REQUEST, socketRequestJoin);
        socket.on(MatchChannels.ACCEPT, socketAcceptJoin);
        socket.on(MatchChannels.REJECT, socketRejectJoin);
        socket.on(MatchChannels.END, socketEndMatch);
        socket.on(MatchChannels.PROGRESS, socketInProgress);
        socket.on(MatchChannels.MATCH, socketInMatch);
        socket.on(MatchChannels.CONNECT, socketConnect);
        socket.on(MatchChannels.LEAVE, socketOnLeave);
        socket.on(MatchChannels.DISCONNECT, (msg: string) => socketDisconnect(socket.id));
        kafkaSocket(socket);
        //user
    });
};

const kafkaName = (chanel: MatchChannels) => {
    return KafkaEnum.socketName + chanel;
};
const kafkaSocket = (io: Socket<any>) => {
    io.on(kafkaName(MatchChannels.MATCH), redisInMatch);
    io.on(kafkaName(MatchChannels.MESSAGE), redisMessage);
    io.on(kafkaName(MatchChannels.REQUEST), redisRequestJoin);
    io.on(kafkaName(MatchChannels.ACCEPT), redisAcceptJoin);
    io.on(kafkaName(MatchChannels.REJECT), redisRejectJoin);
    io.on(kafkaName(MatchChannels.END), redisEndMatch);
    io.on(kafkaName(MatchChannels.PROGRESS), redisInProgress);
    io.on(kafkaName(MatchChannels.CONNECT), redisConnect);
    io.on(kafkaName(MatchChannels.DISCONNECT), redisDisconnect);
    io.on(kafkaName(MatchChannels.WATCH), redisWatching);
    io.on(kafkaName(MatchChannels.LEAVE), redisOnLeave);
    io.on(kafkaName(MatchChannels.STATUS), redisStatusUpdate);
};
