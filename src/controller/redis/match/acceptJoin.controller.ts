import { initSocket } from 'lib/socket.manager';

import { Channels } from 'constant/channels';

const redisAcceptJoin = async (msg: string) => {
    try {
        const io = initSocket();
        const { groupId, user } = JSON.parse(msg);
        io.to(user.socketID).emit(Channels.ON_ACCEPT_JOIN, { groupId, user });
    } catch (error) {
        console.log(error);
    }
};

export default redisAcceptJoin;
