import express from 'express';
import { Config } from './config/config';
import cors from 'cors';
import { initSocket } from './lib/socket.manager';
import { redisLisner } from 'lib/redis.sub';
import { kafkaLisntner } from 'lib/kafka.sub';
import { socketLisnter } from 'lib/socket.sub';
import userRoutes from '@routes/user.routes';
import connectDB from '@db/mongo.db';
import chessRoutes from '@routes/chess.routes';

const app = express();
const server = app.listen(Config.PORT, async () => {
    const io = await initSocket(server);
    connectDB();
    socketLisnter(io);
    redisLisner();
    kafkaLisntner();
    console.log(`Server is running on port ${Config.PORT}`);
});

app.use(cors({ origin: ['*'] }));
app.use(express.json());
app.use(express.text());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/chess', chessRoutes);
