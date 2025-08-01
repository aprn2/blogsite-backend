import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const loginDataValidator = Joi.object({
	userName: Joi.string()
		.alphanum()
		.min(5)
		.max(20)
		.required(),

	password: passwordComplexity({min: 8, max: 128, lowerCase: 1, upperCase: 1, symbol: 1}),

	remember: Joi.boolean().
	required()

}).required();

export {loginDataValidator};
