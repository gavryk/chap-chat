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
		const { passwordHash, ...userData } = user._doc;

		const token = jwt.sign({ ...userData }, 'secret_id', { expiresIn: '30d' });
		return res
			.cookie('access_token', token, { httpOnly: true, secure: true })
			.status(200)
			.json({ ...userData });
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
		//create data doc
		const oldUserEmail = await UserModel.findOne({ userEmail });
		const oldUserName = await UserModel.findOne({ userName });

		if (oldUserEmail || oldUserName) {
			return res.status(400).send({ message: 'User already exists' });
		}
		//hash password
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

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
			res.cookie('access_token', token, { sameSite: 'none', secure: true }).status(201).json({
				id: user._id,
			});
		});
	} catch (err) {
		console.log(err);

		res.status(500).json({
			message: 'Failed to register!',
		});
	}
};

export const getProfile = (req, res) => {
	const token = req.cookies?.access_token;
	if (token) {
		jwt.verify(token, 'secret_id', {}, (err, userData) => {
			if (err) throw err;
			res.json(userData);
		});
	} else {
		res.status(401).json('no token');
	}
};
export const logout = (req, res) => {
	res.cookie('access_token', '', { sameSite: 'none', secure: true }).json('ok');
};
