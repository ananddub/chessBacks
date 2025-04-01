import express, { Request, Response } from 'express';
import {
    createUser,
    deleteUser,
    getAllUsers,
    getSingleUser,
    setSocketId,
    updateUser,
    userLogin,
} from 'controller/routes/user.controller';
import { zodValidation } from 'middleware/zod.middleware';
import {
    deleteUserSchema,
    getUserSchema,
    loginSchema,
    registerSchema,
    setSocketIdSchema,
    updateUserSchema,
    whoSchema,
} from '@utils/zodvalidation/user.zod';
import redisPublish from '@utils/redis.pub';
import { MatchChannels } from '@constant/channels';
import { UserChannels } from '@constant/userchannel';
import kafkProducer from '@utils/kafka/kafka.producer';
import { User } from '@models/user.modal';
import { Mongoose } from 'mongoose';

const userRoutes = express.Router();

userRoutes.get('/users', getAllUsers);
userRoutes.get('/user/:id', zodValidation(getUserSchema), getSingleUser);
userRoutes.post('/register', zodValidation(registerSchema), createUser);
userRoutes.put('/user/:id', zodValidation(updateUserSchema), updateUser);
userRoutes.delete('/user/:id', zodValidation(deleteUserSchema), deleteUser);
userRoutes.post('/login', zodValidation(loginSchema), userLogin);
userRoutes.post('/socket', zodValidation(setSocketIdSchema), setSocketId);
userRoutes.get('/who/:id', zodValidation(whoSchema), async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) res.status(401).send({ user: null });
        else res.status(200).send({ user });
    } catch (error) {
        console.log(error);
        res.status(501).send({ status: 'error' });
    }
});

userRoutes.post('/reqfriend/:id', zodValidation(getUserSchema), (req, res) => {
    try {
        const { id } = req.params;
        redisPublish(UserChannels.FREIND_REQUEST, JSON.stringify({ id }));
        kafkProducer(UserChannels.FREIND_REQUEST)(JSON.stringify({ id }));
        res.send({ status: 'ok' });
    } catch (error) {
        console.log(error);
        res.status(501).send({ status: 'error' });
    }
});

export default userRoutes;
