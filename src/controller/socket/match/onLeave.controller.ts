import { Channels } from 'constant/channels';

import kafkProducer from '@utils/kafka/kafka.producer';

const socketOnLeave = async (msg: string) => {
    try {
        kafkProducer(Channels.ON_LEAVE)(msg);
    } catch (error) {
        console.log(error);
    }
};

export default socketOnLeave;
