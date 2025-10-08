import express from 'express';
import {authenticate, getAccessToken, getRefreshToken, invalidateRefreshToken} from '../controllers/auth.js';

const authRoute = express.Router();

authRoute.post('/login', async(req, res, next) => {
	const user = await authenticate(req.body)
	const refreshToken =  await getRefreshToken({cxt :{id: user.id, userName: user.userName, isAdmin: user.admin}});
	const accessToken =  await getAccessToken(refreshToken);
	res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
	return res.json({id: user.id, userName: user.userName, admin: user.admin, accessToken: accessToken, dob: user.dob, email: user.email});
});

authRoute.delete('/logout', async(req, res, next) => {
    console.log('hit')
	await invalidateRefreshToken(req.cookies['refreshToken']);
	return res.json({message: 'logged out successfully'});
});

export default authRoute;
