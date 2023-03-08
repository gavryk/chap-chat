import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';
const jwtSecret = process.env.JWT_SECRET;

export const login = async (req, res) => {
	try {
		const { userName, password } = req.body;
		const user = await UserModel.findOne({ userName });

		if (!user) {
			return res.status(404).json({
				message: 'Invalid login or password',
			});
		}

		const passOk = bcrypt.compareSync(password, user._doc.passwordHash);
		if (!passOk) {
			return res.status(400).json({
				message: 'Invalid login or password',
			});
		}

		jwt.sign({ _id: user._id, userName }, 'secret_id', { expiresIn: '30d' }, (err, token) => {
			if (err) throw err;
			res.cookie('token', token, { sameSite: 'none', secure: true }).json({
				id: user._id,
			});
		});

		//Get all data without hash
		const { passwordHash, ...userData } = user._doc;
		//Return information
		res.json(userData);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to login!',
		});
	}
};

export const register = async (req, res) => {
	try {
		const { userName, userEmail, avatarUrl, password } = req.body;
		//hash password
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		//create data doc
		const oldUserEmail = await UserModel.findOne({ userEmail });
		const oldUserName = await UserModel.findOne({ userName });

		if (oldUserEmail || oldUserName) {
			return res.status(400).send({ message: 'User already exists' });
		}
		const doc = new UserModel({
			userEmail,
			userName,
			avatarUrl,
			passwordHash: hash,
		});
		//save info in db
		const user = await doc.save();

		jwt.sign({ _id: user._id, userName }, 'secret_id', { expiresIn: '30d' }, (err, token) => {
			if (err) throw err;
			res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
				id: user._id,
			});
		});

		//Get all data without hash
		const { passwordHash, ...userData } = user._doc;
		//Return information
		res.json({ ...userData });
	} catch (err) {
		console.log(err);

		res.status(500).json({
			message: 'Failed to register!',
		});
	}
};
