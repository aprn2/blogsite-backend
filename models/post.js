import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
	subTitle: {
		type: String,
		required: true
	},
	contents: [{
		type: mongoose.Schema.Types.Mixed,
		validate: {
			validator: v => {
				return (
                    v && (
                        (v.type === 'text' && typeof v.content === 'string' && v.content.length > 5)
                        || (v.type === 'image' && typeof v.content === 'string')
                    )
                )
			},
			message: 'Content must be String or image' // paragraph or image
		}
	}]
}, {_id: false});

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},

	authorId: [{
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
		type: mongoose.Types.ObjectId,
		ref: 'Image',
		required: true
	},
	body: {
		type: [SectionSchema],
		required: true,
		validation: v => Array.isArray(v) && v.length > 0
	}
}, {timestamps: true, strict: 'throw'});

const Post = mongoose.model('Post', PostSchema);

export default Post;
