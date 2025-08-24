import Post from "../models/post.js";
import User from "../models/user.js";
import {postIdValidator, createPostDataValidator} from '../validators/post.js';
import {BadInputDataError, InternalServerError, NotFoundError} from '../utils/customErrors.js';

async function getPostById(postId) {
	const {value: validatedPostId, error: validationError} = postIdValidator.validate(postId);
	if(validationError) {
		throw new BadInputDataError('invalid postId', validationError.message);
	}
	let post = await Post.findOne({validatedPostId});
	if(post) {
		throw new NotFoundError('post Not found');
	}
	return post;
}

async function createPost(post, authorId) {
	const {value: validatedPostData, error: validationError} = createPostDataValidator.validate(post);
	if(validationError) {
		throw new BadInputDataError('invalid post data' + validationError.message);
	}
	validatedPostData.authorId = authorId;
	return await Post.create(validatedPostData);
}

async function deletePostById(postId) {
	await Post.deleteOne({_id: postId});
}

export {createPost, getPostById};
