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

async function createPost(post, {authorUserName}) {
	const {value: validatedPostData, error: validationError} = createPostDataValidator.validate(post);
	if(validationError) {
		throw new BadInputDataError('invalid post data' + validationError.message);
	}
	const loggedUser = await User.findOne({userName: authorUserName});
	validatedPostData.author = loggedUser._id;
	validatedPostData.body.map((section) => {
		if(! section.images) {
			return;
		}
		section.images.map((image,index) => {
			//image.url = loggedUser._id; //juts ignore it we are gonna store this image and take and url. this ll be implementd.
			section.images[index].image = loggedUser._id;
			delete section.images[index].payload;
		});
	});
	return await Post.create(validatedPostData);
}

async function deletePostById(postId) {
	await Post.deleteOne({_id: postId});
}

export {createPost, getPostById};
