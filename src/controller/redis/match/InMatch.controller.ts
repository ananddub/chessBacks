import { SendEnum } from '@constant/sendEnum';
import { TURN } from './../../../constant/channels';
import { MatchChannels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';
import sendUser from '@utils/send.user';

const redisInMatch = async (msg: string) => {
    try {
        const io = await initSocket();
        console.log('redis in match', msg);

        const { value, to, turn } = JSON.parse(msg);
        const newTurn = turn === TURN.BLACK ? TURN.WHITE : TURN.BLACK;
        const send_players = sendUser(MatchChannels.MATCH, to, SendEnum.PLAYERS);
        const send_watching = sendUser(MatchChannels.MATCH, to, SendEnum.WATCHING);
        const jsonvalues = {
            value: value,
            turn: newTurn,
        };
        io.emit(send_players, jsonvalues);
        io.emit(send_watching, jsonvalues);
    } catch (error) {
        console.log(error);
    }
};

export default redisInMatch;
