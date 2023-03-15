import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

export const SocketConnection = async (connection, req) => {
	const cookie = req.headers.cookie;
	if (cookie) {
		const tokenCookieString = cookie.split(';').find((str) => str.startsWith('access_token='));
		if (tokenCookieString) {
			const token = tokenCookieString.split('=')[1];
			if (token) {
				const { _id } = jwt.verify(token, 'secret_id');
				const user = await UserModel.findById(_id);
				connection.userId = user._id;
				connection.userName = user.userName;
			}
		}
	}
};
