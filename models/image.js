import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
	source: {
		type: String,
		required: true
	},
    removed: {
        type: Boolean,
        default: false
    }
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
