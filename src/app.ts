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
app.use(
    cors({
        origin: function (origin, callback) {
            console.log(origin);
            callback(null, true); // sabko allow
        },
    })
);
const server = app.listen(Config.PORT, async () => {
    try {
        const io = await initSocket(server);
        socketLisnter(io);
        redisLisner();
        kafkaLisntner();
        connectDB();
        console.log(`Server is running on port ${Config.PORT}`);
    } catch (err) {
        console.log(err);
    }
});

app.use(express.json());
app.use(express.text());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/chess', chessRoutes);

export default app;
