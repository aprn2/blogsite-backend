import Joi from '../utils/joiHelper.js';
import passwordComplexity from 'joi-password-complexity';

const createUserValidator = Joi.object({
	name: Joi.string()
		.alphanum()
		.min(2)
		.max(50)
		.required(),

	userName: Joi.string()
		.alphanum()
		.min(5)
		.max(20)
		.required(),

	password: passwordComplexity({min: 8, max: 128, lowerCase: 1, upperCase: 1, symbol: 1}),

	email: Joi.string()
		.email(),

	dob: Joi.date()
		.format('YYYY-MM-DDTHH:mm:ss.SSSZ')
		.required(),

	address: Joi.string(),

}).required();

const getUserValidator = Joi.string().alphanum().required();

export {createUserValidator, getUserValidator};
