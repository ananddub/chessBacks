import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { User } from '@models/user.modal';
import kafkProducer from '@utils/kafka/kafka.producer';
import { Channels } from 'constant/channels';
import mongoose from 'mongoose';

const userRoutes = express.Router();
const kafkaConnect = kafkProducer(Channels.ON_CONNECT);

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'Email already in use' });
            return;
        }
        const data = {
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password,
        };

        kafkProducer(Channels.ON_CREATE_USER)(JSON.stringify(data));
        res.status(201).send(data._id);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ status: 'ok' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const setSocketId = async (req: Request, res: Response) => {
    try {
        const { socketId, id } = req.body;
        kafkaConnect(JSON.stringify({ id, socketId }));
        res.send({ status: 'ok' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            res.status(404).json({ error: 'email or password does not match' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'email or password does not match' });
            return;
        }

        const userWithoutPassword = _.omit(user.toObject(), ['password', '__v']);

        res.json({ status: 'ok', user: { ...userWithoutPassword } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export default userRoutes;
