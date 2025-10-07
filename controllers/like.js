import { Like } from "../models/like.js"
import Post from "../models/post.js";

export async function createLike(userId, postId) {
    await Like.create({postRef: postId, userRef: userId});
    await Post.findByIdAndUpdate(postId, {$inc: { likeCounts: 1}}, {new: true});
}

export async function removeLike(userId, postId) {
    await Like.deleteMany({postRef: postId, userRef: userId})
    await Post.findByIdAndUpdate(postId, {$inc: { likeCounts: -1}}, {new: true});
}

export async function isLiked(userId, postId) {
    const like = await Like.findOne({postRef: postId, userRef: userId})
    if(! like) {
        return false;
    }
    return true;
}

export async function getLiked(userId) {
    const likes = await Like.find({userRef: userId})
    const likedPostIds = likes.map(l => l.postRef);
    const likedPosts = await Post.find({ _id: { $in: likedPostIds } });
    return likedPosts;
}
