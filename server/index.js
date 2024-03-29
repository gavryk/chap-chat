import express from 'express';
import * as fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import { loginValidator, registerValidator } from './validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { register, login, getProfile, logout } from './controllers/UserController.js';
import { getMessages } from './controllers/MessageController.js';
import { getAllPeople } from './controllers/ChatController.js';
import { socketConnect } from './controllers/SocketController.js';

const __dirname = path.resolve();
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.get('/profile', checkAuth, getProfile);
app.post('/logout', logout);
//Get People
app.get('/people', getAllPeople);
app.get('/messages/:userId', getMessages);

//Upload Image Route
app.post('/upload', upload.single('image'), (req, res) => {
	const { file } = req;
	if (file) {
		res.json({
			url: `/uploads/${req.file.filename}`,
		});
	}
});
app.delete('/upload/:name', async (req, res) => {
	const name = req.params.name;
	try {
		fs.unlinkSync(`./uploads/${name}`, (err) => {
			if (err) throw err;
		});
		res.json({
			message: 'File Deleted',
		});
	} catch (error) {
		console.log(error);
	}
});

const server = app.listen(process.env.PORT || 4040, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server is running!');
});

//WebSocket
socketConnect(server);
