import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	tags: {
		type: [String],
		required: true,
		default: []
	},
	likeCounts: {
		type: Number,
		required: true,
		default: 0
	},
	coverImage: {
		type: mongoose.Types.ObjectId,
		ref: 'Image',
		required: true
	},
	body: {
		type: String,
		required: true,
	}
}, {timestamps: true, strict: 'throw'});

const Post = mongoose.model('Post', PostSchema);

export default Post;
