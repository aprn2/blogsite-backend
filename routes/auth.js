import express from 'express';
import {authenticate, getAccessToken, getRefreshToken, invalidateRefreshToken} from '../controllers/auth.js';

const authRoute = express.Router();

authRoute.post('/login', async(req, res, next) => {
	const user = await authenticate(req.body)
	const refreshToken =  await getRefreshToken({id: user.id, userName: user.userName, admin: user.admin});
	const accessToken =  await getAccessToken(refreshToken);
	res.cookie('refreshToken', refreshToken, {httpOnly: true});
	res.json({id: user.id, userName: user.userName, admin: user.admin, accessToken: accessToken});
});

authRoute.delete('logout', async(req, res, next) => {
	await invalidateRefreshToken(req.cookies.refreshToken);
	res.json({message: 'logged out successfully'});
});

export default authRoute;
