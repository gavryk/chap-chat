import express from 'express';
import * as fs from 'fs';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import { loginValidator, registerValidator } from './validations.js';
import { handleValidationErrors } from './utils/index.js';
import { register, login, getProfile } from './controllers/UserController.js';

//.env config
dotenv.config({ debug: true });
mongoose
	.connect(process.env.MONGO_DB)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	}),
);
app.use('/uploads', express.static('/uploads'));

//Upload Storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (!fs.existsSync('uploads')) {
			fs.mkdirSync('uploads');
		}
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname.replaceAll(' ', '_'));
	},
});
const upload = multer({ storage });

//Routes
//Auth
app.post('/auth/register', registerValidator, handleValidationErrors, register);
app.post('/auth/login', loginValidator, handleValidationErrors, login);
//get profile
app.get('/profile', getProfile);

//Upload Image Route
app.post('/upload', upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.filename}`,
	});
});

app.listen(process.env.PORT || 4040, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server is running!');
});
