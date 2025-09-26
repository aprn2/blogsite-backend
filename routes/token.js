import express from 'express';
import { getAccessToken } from '../controllers/auth.js';
import { UnauthorizedAccessError } from '../utils/customErrors.js';

const tokenRoute = express.Router();

tokenRoute.get('/', async(req, res, next) => {
    if(! req.cookies['refreshToken']) {
        throw new UnauthorizedAccessError('no cookie provided');
    }

    const refreshToken = req.cookies['refreshToken'];
    const newAccessToken = await getAccessToken(refreshToken);
    return res.send({accessToken: newAccessToken});
});

export default tokenRoute;
