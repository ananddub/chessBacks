import { Channels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';

const redisRequestJoin = async (msg: string) => {
    try {
        const io = initSocket();
        const { groupId, user } = JSON.parse(msg);
        io.to(user.socketID).emit(Channels.ON_REQUEST_JOIN, { groupId, user });
    } catch (error) {
        console.log(error);
    }
};

export default redisRequestJoin;
