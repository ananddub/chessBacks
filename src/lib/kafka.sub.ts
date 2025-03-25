import kafkaConsumer from '@utils/kafka/kafka.consumer';
import { MatchChannels } from 'constant/channels';

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
    kafkaConsumer(MatchChannels.MATCH, kafkaInMatch);
    kafkaConsumer(MatchChannels.PROGRESS, kafkaInProgress);
    kafkaConsumer(MatchChannels.END, kafkaEndMatch);
    kafkaConsumer(MatchChannels.MESSAGE, KafkaMessage);
    kafkaConsumer(MatchChannels.REQUEST, kafkaRequestJoin);
    kafkaConsumer(MatchChannels.ACCEPT, kafkaAcceptJoin);
    kafkaConsumer(MatchChannels.REJECT, kafkaRejectJoin);
    kafkaConsumer(MatchChannels.CONNECT, kafkaConnect);
    kafkaConsumer(MatchChannels.DISCONNECT, kafkaDisconnect);
    kafkaConsumer(MatchChannels.CUSTOM, kafkaCustomChallenge);
    kafkaConsumer(MatchChannels.LEAVE, KafkaOnLeave);
    kafkaConsumer(MatchChannels.USER, kafkaCreateUser);
};
