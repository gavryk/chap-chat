import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { registerValidator } from './validations.js';
import { handleValidationErrors } from './utils/index.js';
import { register } from './controllers/UserController.js';

//.env config
dotenv.config({ debug: true });
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
mongoose
	.connect(process.env.MONGO_DB)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

//Routes
//Auth
app.post('/auth/register', registerValidator, handleValidationErrors, register);

app.listen(process.env.PORT || 4040, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server is running!');
});
