import { Chess } from '@models/chess.modal';
import { MatchChannels } from 'constant/channels';
import kafkProducer from '@utils/kafka/kafka.producer';
import express from 'express';
import redisPublish from '@utils/redis.pub';
import { zodValidation } from 'middleware/zod.middleware';
import { getChessGroup, setChessGroup, setCustomChallenge } from '@utils/zodvalidation/chess.zod';
import { UserChallenge } from '@constant/userchannel';
import console from 'console';

const chessRoutes = express.Router();
const kafkaProgress = kafkProducer(MatchChannels.PROGRESS);
const kafkaCustomChallenge = kafkProducer(UserChallenge.CHALLENGE);

chessRoutes.get('/', async (req, res) => {
    try {
        const chessdata = await Chess.find()
            .populate('player1', 'name')
            .populate('player2', 'name')
            .paginate({ page: 1, limit: 20 });

        res.send({
            status: 'ok',
            data: chessdata,
        });
    } catch (error) {
        console.log(error);
        res.status(501).send({ status: 'error' });
    }
});

chessRoutes.post('/register', zodValidation(setChessGroup), (req, res) => {
    try {
        const { id, isPrivate, password } = req.body;
        kafkaProgress(JSON.stringify({ player1: id, isPrivate, password }));
        res.send({ status: 'ok' });
    } catch (error) {
        console.log(error);
        res.status(501).send({ status: 'error' });
    }
});
chessRoutes.post('/custom', zodValidation(setCustomChallenge), (req, res) => {
    try {
        const { player1, player2, isPrivate, password } = req.body;
        kafkaCustomChallenge(JSON.stringify({ player1, player2, isPrivate, password }));
        res.send({ status: 'ok' });
    } catch (err) {
        console.log(err);
        res.status(501).send({ status: 'error' });
    }
});
chessRoutes.post('/request', zodValidation(getChessGroup), (req, res) => {
    try {
        const { groupId, id } = req.body;
        redisPublish(MatchChannels.REQUEST, JSON.stringify({ groupId, id }));
        res.send({ status: 'ok' });
    } catch (err) {
        console.log(err);
        res.status(501).send({ status: 'error' });
    }
});

chessRoutes.post('/accept', zodValidation(getChessGroup), (req, res) => {
    try {
        const { groupId, id } = req.body;
        kafkProducer(MatchChannels.ACCEPT)(JSON.stringify({ groupId, id }));
        res.send({ status: 'ok' });
    } catch (error) {
        console.log(error);
        res.status(501).send({ status: 'error' });
    }
});

chessRoutes.get('/reject', zodValidation(getChessGroup), (req, res) => {
    try {
        const { groupId, id } = req.body;
        redisPublish(MatchChannels.REJECT, JSON.stringify({ id }));
        res.send({ status: 'ok' });
    } catch (error) {
        console.log(error);
        res.status(501).send({ status: 'error' });
    }
});

chessRoutes.get('/history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const chessdata = await Chess.find({
            $or: [{ 'player1.user': id }, { 'player2.user': id }],
        })
            .populate('player1.user', 'name _id email')
            .populate('player2.user', 'name _id email')
            .sort({ createdAt: -1 })
            .paginate({ page: 1, limit: 10 });

        if (!chessdata) {
            res.send({ status: 'ok', data: [] });
            return;
        }
        res.send({
            status: 'ok',
            data: chessdata,
            id: id,
        });
    } catch (error) {
        console.log(error);
        res.status(501).send({ status: 'error', data: [] });
    }
});

export default chessRoutes;
