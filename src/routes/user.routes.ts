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
} from '@utils/zodvalidation/user.zod';

const userRoutes = express.Router();

userRoutes.get('/users', getAllUsers);
userRoutes.get('/user/:id', zodValidation(getUserSchema), getSingleUser);
userRoutes.post('/register', zodValidation(registerSchema), createUser);
userRoutes.put('/user/:id', zodValidation(updateUserSchema), updateUser);
userRoutes.delete('/user/:id', zodValidation(deleteUserSchema), deleteUser);
userRoutes.post('/login', zodValidation(loginSchema), userLogin);
userRoutes.post('/socket', zodValidation(setSocketIdSchema), setSocketId);

export default userRoutes;
