import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/user.js';
import handleError from './middlewares/errorResponse.js';
import imageRoute from './routes/image.js';
import authRoute from './routes/auth.js';
import dotenv from 'dotenv';


dotenv.config();

import verifyToken from './middlewares/authorization.js';

mongoose.connect(process.env.DB_URL);

const server = express();


server.use(express.json());

server.get('/', (req, res) => res.status(200).json('OK'));
server.use('/auth',verifyToken, authRoute);
server.use('/user',verifyToken, userRoute);
server.use('/image',verifyToken, imageRoute);
//server.use('/post', postRoute);
server.use((req, res) => res.status(404).json({message: ':('}));

// general error handler middleware
server.use((err, req, res, next) => handleError(err, res));

server.listen(3000);



//createPost({
//	title: 'how to fuck',
//	description: 'In this blog i am fucking to fuck how to fuck in 3 beginer friendly fucking postions',
//	tags: ['jk'],
//	coverImage: 'kj',
//	body: [
//		{
//			subTitle: 'cowgirl', 
//			images: [{payload: '137ASa'}], // i just dont know how to get the image. just for now pretend its base64 string
//			paragraphs: [
//				'cowgirl is girlie on top, she rides, she is the one who acts',
//				'cowgirl is hard, maybe results in dick injury'
//			]
//		},
//		{
//			subTitle: 'missionary',
//			images: [{payload: '7A78S'}],
//			paragraphs: [
//				'missionary is girl lying peacefully, thrust her untill cum',
//				'its the normal position and is best to make pregnant',
//				'intense eye contact and love making can happen',
//				'visually great, can adore her body, the jiggling of jugs, awesome'
//			]
//		},
//		{
//			subTitle: 'doggy',
//			images: [{payload: '134AAE', description: 'girl fucked doggy'}, {payload: 'A374EB'}],
//			paragraphs: [
//				'its the default postion in mamals, just names after dog\'s nastiness',
//				'just great for ass guys, ass jiggles, but unfortunately can\'t view the jugs, just grab em from behind if you want to feel em both, you can\'t see both same times',
//				'hair pulling is possible, ass slaming is possible, clapping sound is possible as its a good audio feedback'
//			]
//		},
//		{
//			subTitle: 'summary',
//			paragraphs: [
//				'just fuck, enjoy, these are the beginers way of fucking',
//				'start with kiss, missionary, toss her and do in doggy, finally finish whistle doing missionary by adoring the beautifull senary of tits bouncing'
//			]
//		},
//		{
//			subTitle: 'Follow for more',
//			paragraphs: [
//				'remember, these are just beginer positions, and you can explore more things by clicking that follow button, why hesitate just click it, its free!',
//				'just be in touch to learn more about more. more suffs are coming',
//				'be a pro, pro series is releasing on monday, explore the difficult positions like full nelson for lasting long, the side fuck for big dicks, anal for novel'
//				
//			]
//		}
//	]
//}, {authorUserName: 'fucker001'}).catch((e)=> console.log(e.message, e.stack));
//
