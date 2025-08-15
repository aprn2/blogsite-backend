import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const createUserValidator = Joi.object({
    name: Joi.string()
    .alphanum()
    .min(2)
    .max(50)
    .required()
    .messages({
        'sring.base': 'name must be a string',
        'sring.alphanum': 'name must only contain alphanum',
        'sring.min': 'name should contain atleast 2 characters',
        'sring.max': 'name should not exceed 50 characters',
        'any.required': 'name is required',

    }),

    userName: Joi.string()
    .alphanum()
    .min(5)
    .max(20)
    .required()
    .messages({
        'string.base': 'username must be as string',
        'sring.min': 'username should contain atleast 5 characters',
        'sring.max': 'username should not exceed 20 characters',
        'any.required': 'username is required',
    }),

    password: passwordComplexity({min: 8, max: 128, lowerCase: 1, upperCase: 1, symbol: 1})
    .error(new Error('password should atleast contain 8 char with 1 lowercase, 1 uppencase and 1 special char')),

    email: Joi.string()
    .email()
    .error(new Error('email is invalid')),

    dob: Joi.date()
    .custom((dob, helper) => {
        const now = Date.now();
        const before10Yrs = now - 10 * 365 * 24 * 60 * 60 * 1000
        const before120Yrs = now - 120 * 365 * 24 * 60 * 60 * 1000
        if(dob.getTime() > now) {
            return helper.message('fuck you time traverller');
        }
        if(dob.getTime() < before120Yrs) {
            return helper.message('you are old enough to live');
        }
        if(dob.getTime() > before10Yrs) {
            return helper.message('you dumb child, get out of my porn site');
        }
        return dob;
    })
    .required()
    .messages({
        'date.base': 'dob must be a date',
        'any.required': 'dob is required',
    }),

    address: Joi.string() // optional field
    .error(new Error('address should be a string')),

}).required();

const getUserValidator = Joi
    .string()
    .alphanum()
    .required()
    .messages({
        'string.base': 'username must be a string',
        'string.alphanum': 'username should only contain alphanum',
        'any.required': 'username is required',

    });

export {createUserValidator, getUserValidator};
