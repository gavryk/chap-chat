import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';
const jwtSecret = process.env.JWT_SECRET;

export const register = async (req, res) => {
	try {
		const { userName, userEmail, avatarUrl, password } = req.body;
		//hash password
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		//create data doc
		const doc = new UserModel({
			userEmail,
			userName,
			avatarUrl,
			passwordHash: hash,
		});
		//save info in db
		const user = await doc.save();

		const token = jwt.sign({ _id: user._id, userName }, 'secret_id', { expiresIn: '30d' });

		//Get all data without hash
		const { passwordHash, ...userData } = user._doc;
		//Return information
		res.json({ ...userData, token });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to register!',
		});
	}
};
