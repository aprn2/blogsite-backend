import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UnauthorizedAccessError } from '../utils/customErrors.js';
import { getAccessToken } from '../controllers/auth.js';
dotenv.config();

async function checkToken(req, res, next) {
	if(! req.header.authorization) throw new UnauthorizedAccessError('No token');
	let token = req.headers.authorization.split(' ')[1];
	try{
		jwt.verify(token, process.env.JWT_SECRET);
		return next();
	}catch(e) {
		let refreshToken = req.cookies.refreshToken;
		// maybe dont reject and regenerate the accesstoken, sent to user, then contimue with refreshToken 
		res.body.accessToken = await getAccessToken(refreshToken); // obviously this function verifies the refreshtoken and ensures its in the cache or db then only creates accesstoken
		return next();
	}
};

export default checkToken;
