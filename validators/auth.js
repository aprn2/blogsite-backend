import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const loginDataValidator = Joi.object({
	userName: Joi.string()
    .required()
    .messages({
        'string.base': 'user name must be a string',
        'any.required': 'user name is required',
    }),

	password: Joi.string()
    .required()
    .messages({
        'string.base': 'password must be a string',
        'any.required': 'password is required',
    }),

	remember: Joi.boolean()
	.required()
    .error(new Error('remember is required'))

}).required();

export {loginDataValidator};
