import express from 'express';
import { createUser, getUserByUserName } from '../controllers/user.js';

const userRoute = express.Router();

userRoute.get('/:userName', async(req, res, next) => {
	let user;
	try{
		user = await getUserByUserName(req.params.userName);
        return res.json(user);
	}catch(e) {
		return next(e);
	}
});

userRoute.post('/', async(req, res, next) => {
	let result;
	try{
		result = await createUser(req.body);
        return res.json(result);
	}catch(e) {
		return next(e);
	}
});

export default userRoute;
