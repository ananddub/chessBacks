import { TURN } from './../../../constant/channels';
import { Channels } from 'constant/channels';

import { initSocket } from 'lib/socket.manager';

const redisInMatch = async (msg: string) => {
    try {
        const io = await initSocket();
        const { value, to, turn } = JSON.parse(msg);
        const newTurn = turn === TURN.BLACK ? TURN.WHITE : TURN.BLACK;
        const send_players = `${Channels.ON_MATCH}_${to}_players`;
        const send_watching = `${Channels.ON_MATCH}_${to}_watching`;
        const jsonvalues = {
            value,
            turn: newTurn,
        };
        console.log('in match', jsonvalues);
        io.emit(send_players, jsonvalues);
        io.emit(send_watching, jsonvalues);
    } catch (error) {
        console.log(error);
    }
};

export default redisInMatch;
