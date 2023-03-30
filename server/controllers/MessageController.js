import jwt from 'jsonwebtoken';
import MessageModel from './../models/Message.js';

export const getUserDataFromRequest = async (req) => {
	return new Promise((resolve, reject) => {
		const token = req.cookies?.access_token;
		if (token) {
			const userData = jwt.verify(token, 'secret_id');
			resolve(userData);
		} else {
			reject('no token');
		}
	});
};

export const getMessages = async (req, res) => {
	const { userId } = req.params;
	const userData = await getUserDataFromRequest(req);
	const myId = userData._id;
	const messages = await MessageModel.find({
		sender: { $in: [userId, myId] },
		recipient: { $in: [userId, myId] },
	}).sort({ createdAt: 1 });
	res.json(messages);
};
