import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';

//.env config
dotenv.config({ debug: true });
const app = express();
app.use(express.json());
app.use(cors());
mongoose
	.connect(process.env.MONGO_DB)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

app.listen(process.env.PORT || 4040, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server is running!');
});
