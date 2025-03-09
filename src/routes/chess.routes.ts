import { Chess } from '@models/chess.modal';
import { Channels } from 'constant/channels';
import kafkProducer from '@utils/kafka/kafka.producer';
import express from 'express';
import redisPublish from '@utils/redis.pub';
import { zodValidation } from 'middleware/zod.middleware';
import { getChessGroup, setChessGroup, setCustomChallenge } from '@utils/zodvalidation/chess.zod';

const chessRoutes = express.Router();
const kafkaProgress = kafkProducer(Channels.ON_PROGRESS);
const kafkaCustomChallenge = kafkProducer(Channels.ON_CUSTOM_CHALLENGE);
chessRoutes.get('/', async (req, res) => {
    const chessdata = await Chess.find()
        .populate('player1', 'name')
        .populate('player2', 'name')
        .paginate({ page: 1, limit: 20 });
    res.send({
        status: 'ok',
        data: chessdata,
    });
});

chessRoutes.post('/register', zodValidation(setChessGroup), (req, res) => {
    const { id, isPrivate, password } = req.body;
    kafkaProgress(JSON.stringify({ player1: id, isPrivate, password }));
    res.send({ status: 'ok' });
});
chessRoutes.post('/custom', zodValidation(setCustomChallenge), (req, res) => {
    const { player1, player2, isPrivate, password } = req.body;
    kafkaCustomChallenge(JSON.stringify({ player1, player2, isPrivate, password }));
    res.send({ status: 'ok' });
});
chessRoutes.post('/request', zodValidation(getChessGroup), (req, res) => {
    const { groupId, id } = req.body;
    redisPublish(Channels.ON_REQUEST_JOIN, JSON.stringify({ groupId, id }));
    res.send({ status: 'ok' });
});

chessRoutes.post('/accept', zodValidation(getChessGroup), (req, res) => {
    const { groupId, id } = req.body;
    kafkProducer(Channels.ON_ACCEPT_JOIN)(JSON.stringify({ groupId, id }));
    res.send({ status: 'ok' });
});

chessRoutes.get('/reject', zodValidation(getChessGroup), (req, res) => {
    const { groupId, id } = req.body;
    redisPublish(Channels.ON_REJECT_JOIN, JSON.stringify({ id }));
    res.send({ status: 'ok' });
});

export default chessRoutes;
