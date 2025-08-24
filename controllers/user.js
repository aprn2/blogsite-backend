import { createHash } from 'crypto';
import User from '../models/user.js';
import { createUserValidator, getUserValidator } from '../validators/user.js';
import { NotFoundError, BadInputDataError } from '../utils/customErrors.js';

async function createUser(data) {
	const {value: validatedUserDate, error: validationError} = createUserValidator.validate(data)
	if(validationError) {
		throw new BadInputDataError(validationError.message);
	}

	const passHash = createHash('sha256').update(validatedUserDate.password).digest('hex');
	delete validatedUserDate.password;
	validatedUserDate.passHash = passHash;

	return await User.create(validatedUserDate);
}

async function getUserByUserName(userName) {

	const {value: validatedUserName, error: validationError} = getUserValidator.validate(userName)
	if(validationError) {
		throw new BadInputDataError(validationError.message);
	}

	const user = await User.findOne({userName: validatedUserName}).select('-passHash');

	if(! user) {
		throw new NotFoundError('user not found');
	}
	return user;
}

export {getUserByUserName, createUser};
