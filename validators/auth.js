import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const loginDataValidator = Joi.object({
	userName: Joi.string()
		.alphanum()
		.min(5)
		.max(20)
		.required()
    .messages({
        'string.base': 'user name must be a string',
        'string.alphanum': 'user name should only contain alphanum',
        'string.min': 'user name should atleast contain 5 characters',
        'string.max': 'user naem should not exceed 20 characters',
        'any.required': 'user name is required',
    }),

	password: passwordComplexity({min: 8, max: 128, lowerCase: 1, upperCase: 1, symbol: 1})
    .error(new Error('password should atleast contain 8 char with 1 lowercase, 1 uppencase and 1 special char')),

	remember: Joi.boolean()
	.required()
    .error(new Error('remember is required'))

}).required();

export {loginDataValidator};
