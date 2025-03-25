import { MatchChannels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';

const redisRequestJoin = async (msg: string) => {
    try {
        const io = await initSocket();
        const { groupId, user } = JSON.parse(msg) as { groupId: string; user: any };
        io.to(user.socketID).emit(MatchChannels.REQUEST, { groupId, user });
    } catch (error) {
        console.log(error);
    }
};

export default redisRequestJoin;
