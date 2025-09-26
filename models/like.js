import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userRef: {
        type: mongoose.Types.ObjectId,
        required: true 
    },
    postRef: {
        type: mongoose.Types.ObjectId,
        required: true 
    }
}, {timestamps: true, strict: true});

export const Like = mongoose.model('like', likeSchema);
