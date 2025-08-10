import express from 'express';
import {createPost, getPostById} from '../controllers/post.js';

const postRoute = express.Router();

postRoute.get('/:id', async(req, res, next) => {
	let post;
	try{
		post = await getPostById(req.params.id); 
	}catch(e) {
		next(e);
	}
	res.json(post);
});

postRoute.post('/:id', async(req, res, next) => {
	let post;
	try{
		post = await createPost(req.body); 
	}catch(e) {
		next(e);
	}
	res.json({message: 'post created'});
});

export default postRoute;
