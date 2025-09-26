import jwt from 'jsonwebtoken';
import {createHash} from 'crypto';
import User from '../models/user.js';
import RefreshToken from '../models/refreshToken.js';
import { BadInputDataError, UnauthorizedAccessError } from '../utils/customErrors.js';
import { loginDataValidator } from '../validators/auth.js';

import dotenv from 'dotenv';
dotenv.config();

async function getAccessToken(refreshToken) {
	let accessToken;
	jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        const payload = decoded.cxt;
		if(err) {
			throw new UnauthorizedAccessError('refresh token tampered' + err.message);
		};
		accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1min'});
	});
	const foundToken = await RefreshToken.findOne({refreshToken: refreshToken});
	if(! foundToken) {
		throw new UnauthorizedAccessError('invalid refresh token');
	}
	return accessToken;
}
async function authenticate(credential) {
	const {value: validatedData, error: validationError} = loginDataValidator.validate(credential);
	if(validationError) {
		throw new BadInputDataError('credential invalid' + validationError.message);
	}
	const passHash = createHash('sha256').update(validatedData.password).digest('hex');
	let user = await User.findOne({userName: validatedData.userName, passHash: passHash}, '-passHash');
	if(! user) {
		throw new UnauthorizedAccessError('username and password mismatch');
	}
	return user;
}

async function getRefreshToken(payload) {
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET);
	await RefreshToken.create({refreshToken: refreshToken});
	return refreshToken;
}

async function invalidateRefreshToken(refreshToken) {
	await RefreshToken.deleteOne({refreshToken: refreshToken});
}

export {getRefreshToken, getAccessToken, invalidateRefreshToken, authenticate};
