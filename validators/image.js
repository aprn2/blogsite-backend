import Joi from 'joi';

const imageSourceValidator = Joi.string().required();

export {imageSourceValidator};
