 mport mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
	subTitle: {
		type: String,
		required: true
	},
	images: [{
		image: {
			type: mongoose.Schema.ObjectId,
			ref: 'Image',
			required: true
		},
		description: String,
	}],
	paragraphs: {
		type: [String],
		required: true,
		validate: v => Array.isArray(v) && v.length > 0
	}
}, {_id: false});

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	id: {
		type: String,
		require: true
	},

	description: {
		type: String,
		required: true
	},

	author: [{
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		required: true
	}],
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
	conmmentCounts: {
		type: Number,
		required: true,
		default: 0
	},
	coverImage: {
		type: String,
		required: true
	},
	body: {
		type: [SectionSchema],
		required: true,
		validaton: v => Array.isArray(v) && v.length > 0
	}
}, {timestamps: true, strict: 'throw'});

const Post = mongoose.model('Post', PostSchema);

export default Post;
