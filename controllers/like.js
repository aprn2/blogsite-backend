import mongoose from "mongoose"
import { Like } from "../models/like.js"

export async function createLike(userId, postId) {
    await Like.create({postRef: postId, userRef: userId})
}

export async function removeLike(userId, postId) {
    const session = mongoose.startSession();
    try{
        await Like.deleteMany({postRef: postId, userRef: userId})
    }catch{
    }finally{
    }
}

export async function isLiked(userId, postId) {
    const like = await Like.findOne({postRef: postId, userRef: userId})
    if(! like) {
        return false;
    }
    return true;
}

export async function getLiked(userId) {
    const like = await Like.find({userRef: userId})
    if(! like) {
        return false;
    }
    return true;
}
