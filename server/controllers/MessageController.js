import jwt from 'jsonwebtoken';

export const getUserDataFromRequest = (req) => {
	return new Promise((resolve, reject) => {
		const token = req.cookie?.access_token;
		if (token) {
			const userData = jwt.verify(token, 'secret_id');
		}
	});
};
