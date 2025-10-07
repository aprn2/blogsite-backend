import express from 'express';
import { BadInputDataError } from '../utils/customErrors.js';
import { createLike, getLiked, isLiked, removeLike } from '../controllers/like.js';

const likeRouter = express.Router();

likeRouter.post('/', async(req, res) => {
    const userId = req.tokenPayload.id;
    const postId = req.query?.postId;

    if(! postId) {
        new BadInputDataError('no post id supplied');
    }

    await createLike(userId, postId);

    res.json({message: 'post liked'});
});

likeRouter.delete('/', async(req, res) => {
    const userId = req.tokenPayload.id;
    const postId = req.query?.postId;

    if(! postId) {
        throw new BadInputDataError('no post id supplied');
    }

    await removeLike(userId, postId);

    return res.json({message: 'liked removed'});
    
});

likeRouter.get('/', async(req, res) => {
    const userId = req.tokenPayload.id;
    const postId = req.query?.postId;

    if(! postId) {
        const likedPosts = await getLiked(userId);
        return res.json(likedPosts);
    }

    const liked = await isLiked(userId, postId);
    return res.json(liked);
    
});

export default likeRouter;
