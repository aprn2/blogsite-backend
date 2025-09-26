import express from 'express';
import {createPost, editPost, getPostById, getPostByKeyword, getRecentPosts} from '../controllers/post.js';
import { PermissionError, UnauthorizedAccessError } from '../utils/customErrors.js';

const postRoute = express.Router();

postRoute.get('/search/', async(req, res, next) => {
    const keyword = req.query?.s;
    if(! keyword) {
        throw new BadInputDataError('invalid search keyword');
    }
	let posts;
	try{
		posts = await getPostByKeyword(keyword); 
	}catch(e) {
		next(e);
	}
	res.json(posts);
});

postRoute.get('/:id', async(req, res, next) => {
	let post;
	try{
		post = await getPostById(req.params.id); 
        return res.json(post);
	}catch(e) {
		return next(e);
	}
});

postRoute.get('/', async(req, res, next) => {
	let post;
	try{
		post = await getRecentPosts(); 
        return res.json(post);
	}catch(e) {
		return next(e);
	}
});

postRoute.post('/', async(req, res, next) => {
    console.log(req.tokenPayload.isAdmin !== true);
    if(req.tokenPayload.isAdmin !== true) {
        throw new PermissionError('user is not admin');
    }
	let post;
	try{
		post = await createPost(req.body); 
        return res.json({message: 'post created'});
	}catch(e) {
		return next(e);
	}
});

postRoute.patch('/:id', async(req, res, next) => {
    if(req.tokenPayload.isAdmin !== true) {
        throw new UnauthorizedAccessError('user is not admin');
    }
    const id = req.params.id;
	let post;
	try{
		post = await editPost(id, req.body); 
	}catch(e) {
		return next(e);
	}
	res.json({message: 'post updated'});
});

export default postRoute;
