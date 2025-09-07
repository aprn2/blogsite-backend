import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoute from './routes/user.js';
import handleError from './middlewares/errorResponse.js';
import imageRoute from './routes/image.js';
import authRoute from './routes/auth.js';
import postRoute from './routes/post.js';
import dotenv from 'dotenv';

dotenv.config();

import verifyToken from './middlewares/authorization.js';
import { createPost } from './controllers/post.js';
import tokenRoute from './routes/token.js';

mongoose.connect(process.env.DB_URL);

const server = express();

const corsOpt = {
    origin: function(origin, cb) {
        if(origin === 'http://localhost:5173') {
            return cb(null, true);
        }
        throw new Error('cors erro');
    },
    credentials: true
}; 
server.use(cors(corsOpt));


server.use(express.json());

server.get('/', (req, res) => res.status(200).json('OK'));
server.use('/auth', authRoute);
server.use('/token', tokenRoute);
server.use('/user', userRoute);
server.use('/image',verifyToken, imageRoute);
server.use('/post', verifyToken, postRoute);
server.use((req, res) => res.status(404).json({message: ':('}));

// general error handler middleware
server.use((err, req, res, next) => handleError(err, res));

server.listen(3000);

createPost({
    title: 'kdjf',
    description: 'kdjfkj',
    tags: ['kj'],
    coverImage: '688f7c801c89d677835e00e0',
    body: 'jkj'
}, '68a4fcf815c80b6474116e76');
