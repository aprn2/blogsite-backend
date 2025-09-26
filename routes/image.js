import path from 'path';
import fs from 'fs/promises';
import multer from 'multer';
import express from 'express';
import {getImageBySource, uploadImage} from '../controllers/image.js';
import { BadInputDataError } from '../utils/customErrors.js';

import dotenv from 'dotenv';
dotenv.config();

const imageRoute = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
			return cb(new BadInputDataError('unsupported image format, ' + file.mimetype + ' is supplied'));
		}
		cb(null, process.env.IMAGE_DIR);
	},
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}-${Math.random().toString(16).substring(2, 10)}${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
});
const upload = multer({storage: storage});


imageRoute.get('/:id', async(req, res, next) => {
	let imageSource = await getImageBySource(req.params.id);
	let imagePath = path.join(process.cwd(), '/images', imageSource.source);
	await fs.access(imagePath);
	res.sendFile(imagePath);
});

imageRoute.post('/', upload.single('image'), async(req, res, next) => {
	let imageObjId;
	if(! req.file) {
		throw new BadInputDataError('');
	}
	try{
		imageObjId = await uploadImage({source: req.file.filename});
	}catch(e) {
		return next(e);
	}
	res.json({id: imageObjId._id, message: 'uploaded'});
});

export default imageRoute;
