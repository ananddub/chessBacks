import { initSocket } from 'lib/socket.manager';

import { MatchChannels } from 'constant/channels';

const redisAcceptJoin = async (msg: string) => {
    try {
        const io = await initSocket();
        const { groupId, user } = JSON.parse(msg) as { groupId: string; user: any };
        io.to(user.socketID).emit(MatchChannels.ACCEPT, { groupId, user });
    } catch (error) {
        console.log(error);
    }
};

export default redisAcceptJoin;
