import { User } from '@models/user.modal';
import { Status } from 'constant/status';
import { meiliClient } from 'lib/melisearch';
import { KafkaConsumerProps } from 'types/kafka.types';

const kafkaCreateUser = async ({ message, pause, commit }: KafkaConsumerProps) => {
    try {
        const { _id, name, email, password } = JSON.parse(message) as {
            _id: string;
            name: string;
            email: string;
            password: string;
        };
        const user = await User.create({
            _id: _id,
            name,
            email,
            password,
            isOnline: false,
            status: Status.LOBBY,
        });

        await meiliClient.index('users').addDocuments([
            {
                _id,
                name,
                email,
            },
        ]);
    } catch (error) {
        console.log(error);
    }
};

export default kafkaCreateUser;
