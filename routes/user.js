import express from 'express';
import { createUser, getUserByUserName } from '../controllers/user.js';

const userRoute = express.Router();

userRoute.get('/:userName', async(req, res, next) => {
	let user;
	try{
		user = await getUserByUserName(req.params.userName);
	}catch(e) {
		return next(e);
	}
	res.json(user);
});

userRoute.post('/', async(req, res, next) => {
	let result;
	try{
		result = await createUser(req.body);
	}catch(e) {
		return next(e);
	}
	res.json({message: 'user created'});
});

export default userRoute;
