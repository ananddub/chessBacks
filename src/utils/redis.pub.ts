import { UserChannels } from '@constant/userchannel';
import { redisPub } from '@db/redis.db';
import { Channels } from 'constant/channels';

const redisPublish = (channel: Channels | UserChannels, message: string) => {
    redisPub().publish(channel, message);
};

export default redisPublish;
