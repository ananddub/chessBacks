import kafkaConsumer from '@utils/kafka/kafka.consumer';
import { Channels } from 'constant/channels';

import kafkaAcceptJoin from 'controller/kafka/match/acceptJoin.controller';
import kafkaConnect from 'controller/kafka/match/connect.controller';
import kafkaCustomChallenge from 'controller/kafka/match/customChallenge.controller';
import kafkaDisconnect from 'controller/kafka/match/disconnect.controller';
import kafkaEndMatch from 'controller/kafka/match/endMatch.controller';
import kafkaInMatch from 'controller/kafka/match/inMatch.controller';
import kafkaInProgress from 'controller/kafka/match/inProgress.controller';
import KafkaMessage from 'controller/kafka/match/message.controller';
import KafkaOnLeave from 'controller/kafka/match/onLeave.controller';
import kafkaRejectJoin from 'controller/kafka/match/rejectJoin.controller';
import kafkaRequestJoin from 'controller/kafka/match/requestJoin.controller';
import kafkaCreateUser from 'controller/kafka/user/createUser.controller';
export const kafkaLisntner = () => {
    kafkaConsumer(Channels.ON_MATCH, kafkaInMatch);
    kafkaConsumer(Channels.ON_PROGRESS, kafkaInProgress);
    kafkaConsumer(Channels.ON_END_MATCH, kafkaEndMatch);
    kafkaConsumer(Channels.ON_MESSAGE, KafkaMessage);
    kafkaConsumer(Channels.ON_REQUEST_JOIN, kafkaRequestJoin);
    kafkaConsumer(Channels.ON_ACCEPT_JOIN, kafkaAcceptJoin);
    kafkaConsumer(Channels.ON_REJECT_JOIN, kafkaRejectJoin);
    kafkaConsumer(Channels.ON_CONNECT, kafkaConnect);
    kafkaConsumer(Channels.ON_DISCONNECT, kafkaDisconnect);
    kafkaConsumer(Channels.ON_CUSTOM_CHALLENGE, kafkaCustomChallenge);
    kafkaConsumer(Channels.ON_LEAVE, KafkaOnLeave);
    kafkaConsumer(Channels.ON_CREATE_USER, kafkaCreateUser);
};
