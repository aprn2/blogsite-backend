import Joi from 'joi';

const postIdValidator = Joi.string()
    .alphanum()
    .required()
    .messages({
        'string.base': 'post id should be string',
        'string.alphanum': 'post id should only contain alphanum',
        'any.required': 'post id is required',

    });

// images are image url so string
const createPostDataValidator = Joi.object({
    title: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
        'string.base': 'title must be a string',
        'string.min': 'title must be atleast 3 characters',
        'string.max': 'title should not exceed 50 characters',
        'any.required': 'title should not be empty'
    }),
    description: Joi
    .string()
    .min(3)
    .max(100)
    .required()
    .messages({
        'string.base': 'description must be a string',
        'string.min': 'description should not exceed 100 characters',
        'any.required': 'description should not be empty'
    }),
    tags: Joi.array()
    .items(Joi.string())
    .min(1)
    .required()
    .messages({
        'array.base': 'tags must be an array',
        'array.min': 'atleast one tag should be provided',
        'any.required': 'tags should not be empty',
    }),
    coverImage: Joi.string()
    .required()
    .messages({
        'string.base': 'cover image should be a string',
        'any.required': 'cover image is required'
    }),
    body: Joi.string()
    .min(3)
    .required()
    .messages({
        'string.base': 'body image must be a string',
        'string.min': 'body should be atleast 3 characters',
        'any.required': 'body should not be empty'
    })
}).required()
.messages({
    'object.base': 'post data should be an array',
    'any.required': 'post should not be empty'
});

export {createPostDataValidator, postIdValidator};
