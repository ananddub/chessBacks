import { Channels } from 'constant/channels';
import socketMessage from 'controller/socket/match/message.controller';
import socketRequestJoin from 'controller/socket/match/requestJoin.controller';
import socketAcceptJoin from 'controller/socket/match/acceptJoin.controller';
import socketRejectJoin from 'controller/socket/match/rejectJoin.controller';
import socketEndMatch from 'controller/socket/match/endMatch.controller';
import socketInProgress from 'controller/socket/match/inProgress.controller';
import socketInMatch from 'controller/socket/match/inMatch.controller';
import { Server } from 'socket.io';
import socketConnect from 'controller/socket/match/connect.controller';
import socketDisconnect from 'controller/socket/match/disconnect.controller';
import socketOnLeave from 'controller/socket/match/onLeave.controller';

export const socketLisnter = (io: Server) => {
    io.on('connection', (socket) => {
        //match
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
        //user
    });
};
