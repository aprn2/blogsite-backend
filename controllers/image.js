import Image from "../models/image.js";
import { BadInputDataError, NotFoundError } from "../utils/customErrors.js";
import { imageSourceValidator } from "../validators/image.js";

async function getImageBySource(source) {
	const {value: validatedSource, error: validationError} = imageSourceValidator.validate(source);
	if(validationError) {
		throw new BadInputDataError('invalid source'+validationError.message);
	}
	const image = await Image.findOne({_id: validatedSource});
	if(! image) {
		throw new NotFoundError('image not found');
	}
	return image;
}

async function uploadImage(imageObjId) {
	return await Image.create(imageObjId);
}

export {getImageBySource, uploadImage};
