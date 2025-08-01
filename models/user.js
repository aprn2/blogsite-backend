import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
		unique: true
	},
	passHash: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true
	},
	dob: {
		type: Date,
		required: true,
		validate: (dob) => {
			const minDate = new Date('1920-01-01');
			const today = new Date();

			return dob >= minDate && dob <= today;
		}
	},
	address: {
		type: String,
	}
}, {timestamps: true, strict: 'throw'});

const User = mongoose.model('User', userSchema);

export default User;
