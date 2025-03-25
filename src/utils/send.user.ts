import { MatchChannels } from '@constant/channels';
import { SendEnum } from '@constant/sendEnum';
import { UserChannels } from '@constant/userchannel';

const sendUser = (channel: UserChannels | MatchChannels | SendEnum, value: string, user: any): string => {
    return `${channel}:${value}:${user}`;
};

export default sendUser;
