import express from 'express';
import {createPost, getPostById, getPostSearch} from '../controllers/post.js';

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

postRoute.get('/search/', async(req, res, next) => {
    const keyword = req.query?.s;
    if(! keyword) {
        throw new BadInputDataError('invalid search keyword');
    }
	let posts;
	try{
		posts = await getPostSearch(keyword); 
	}catch(e) {
		next(e);
	}
	res.json(posts);
});

postRoute.post('/', async(req, res, next) => {
	let post;
	try{
		post = await createPost(req.body); 
	}catch(e) {
		next(e);
	}
	res.json({message: 'post created'});
});

export default postRoute;
