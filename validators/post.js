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
	author: Joi.string()
		.min(5)
		.max(20)
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
			images: Joi.array()
				.items(Joi.string())
				.min(0).required(), // array of images or empty array
			paragraphs: Joi.array()
				.items(Joi.string() .min(3))
				.min(1)
				.required() // array of paragraphs atleast one paragraph

	})).min(1).required() // atleast one section

}).required();

export {createPostDataValidator, postIdValidator};
