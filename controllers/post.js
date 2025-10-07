import Post from "../models/post.js";
import {postIdValidator, createPostDataValidator, updatePostBodyValidator} from '../validators/post.js';
import {BadInputDataError, NotFoundError} from '../utils/customErrors.js';

async function getPostById(postId) {
	const {value: validatedPostId, error: validationError} = postIdValidator.validate(postId);
	if(validationError) {
		throw new BadInputDataError('invalid postId', validationError.message);
	}
	let post = await Post.findOne({ _id: validatedPostId});
	if(! post) {
		throw new NotFoundError('post Not found');
	}
	return post;
}

async function getRecentPosts() {
	let posts = await Post.find({}).sort({createdAt: -1}).limit(50);
	if(! posts) {
		throw new NotFoundError('post Not found');
	}
	return posts;
}

async function getPostByKeyword(keyword) {
	let posts = await Post.find({title: {$regex: keyword, $options: 'i'}});
	if(! posts) {
		throw new NotFoundError('post Not found');
	}
	return posts;
}

async function createPost(post) {
	const {value: validatedPostData, error: validationError} = createPostDataValidator.validate(post);
	if(validationError) {
		throw new BadInputDataError('invalid post data' + validationError.message);
	}
	return await Post.create(validatedPostData);
}

async function editPost(id, postBody) {
	const {value: validatedPostBody, error: validationError} = updatePostBodyValidator.validate(postBody);
	if(validationError) {
		throw new BadInputDataError('invalid post body' + validationError.message);
	}
	return await Post.findOneAndUpdate({_id: id}, {$set: {body: validatedPostBody.body}}, {runValidators: true, new: true});
}

async function deletePostById(postId) {
	await Post.deleteOne({_id: postId});
}

export {createPost, getPostById, getRecentPosts, getPostByKeyword, deletePostById, editPost};
