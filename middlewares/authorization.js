import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UnauthorizedAccessError } from '../utils/customErrors.js';
dotenv.config();

async function checkToken(req, _res, next) {
	if(! req.headers.authorization) throw new UnauthorizedAccessError('No token');
	let token = req.headers.authorization.split(' ')[1];
	try{
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.tokenPayload = payload;
		return next();
	}catch(e) {
        throw new UnauthorizedAccessError('token invalid');
	}
};

export default checkToken;
