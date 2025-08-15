import Joi from 'joi';

const imageSourceValidator = Joi
    .string()
    .required()
    .messages({
        'string.base': 'image source should be a string',
        'any.required': 'image source is required',
    });

export {imageSourceValidator};
