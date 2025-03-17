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
import { Channels } from '@constant/channels';
import { UserChannels } from '@constant/userchannel';
import kafkProducer from '@utils/kafka/kafka.producer';
import { User } from '@models/user.modal';

const userRoutes = express.Router();

userRoutes.get('/users', getAllUsers);
userRoutes.get('/user/:id', zodValidation(getUserSchema), getSingleUser);
userRoutes.post('/register', zodValidation(registerSchema), createUser);
userRoutes.put('/user/:id', zodValidation(updateUserSchema), updateUser);
userRoutes.delete('/user/:id', zodValidation(deleteUserSchema), deleteUser);
userRoutes.post('/login', zodValidation(loginSchema), userLogin);
userRoutes.post('/socket', zodValidation(setSocketIdSchema), setSocketId);
userRoutes.get('/who/:id', zodValidation(whoSchema), async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) res.send({ user: null });
    else res.send({ user });
});

userRoutes.post('/reqfriend/:id', zodValidation(getUserSchema), (req, res) => {
    const { id } = req.params;
    redisPublish(UserChannels.ON_USER_FREIND_REQUEST, JSON.stringify({ id }));
    kafkProducer(UserChannels.ON_USER_FREIND_REQUEST)(JSON.stringify({ id }));
    res.send({ status: 'ok' });
});

export default userRoutes;
