import Joi from 'joi';

const postIdValidator = Joi.string().alphanum();

// images are image url so string
const createPostDataValidator = Joi.object({
	title: Joi.string()
		.min(3)
		.max(50)
		.required(),
	description: Joi
		.string()
		.min(3)
		.max(300)
		.required(),
	tags: Joi.array()
		.items(Joi.string())
		.min(1)
		.required(),
	coverImage: Joi.string()
		.required(),
	body: Joi.array()
		.items(Joi.object({ // array of sections
			subTitle: Joi.string()
				.max(50)
				.required(),
		contents: Joi.array()
			.items(
				Joi.object({
					type: Joi.string().valid('text', 'image'),
					url: Joi.string().when('type', {
						is: 'image',
						then: Joi.required(),
						otherwise: Joi.forbidden()
					}),
					content: Joi.string().when('type', {
						is: 'text',
						then: Joi.required(),
						otherwise: Joi.forbidden()
					})
				})
			)
		.min(1).required(), // array of images or text array, atleast one element is needed
	})).min(1).required() // atleast one section

}).required();

export {createPostDataValidator, postIdValidator};
